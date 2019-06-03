const path = require('path');
const server = require(path.resolve(__dirname, '../server/server'));
const Functions = require('./functions');
const CONF = require('../client/config');
const Base58 = require('base58-string');
const web3 = require('web3');


parseTransactions();

async function parseTransactions() {
    for(const network of CONF.networks){
        const last = await server.models.transaction.findOne({where:{network:network.name}, order:'createdAt desc'});
        const transactions = await getTransactions(network, last);
        for(const transaction of transactions){
            const tx = adaptTransaction(network, transaction);
            if(!tx.to) continue;
            server.models.transaction.create(tx)
                .then(t=>console.log('Tr created: ', t.id))
                .catch(e=>console.error(e.message, tx.hash))
        }
    }
}

async function getTransactions(network, last) {
    let url;
    switch (network.provider) {
        case 'ETH':
            url = `${network.api}module=account&action=txlist&address=${network.mainAddress}${last ? '&sort=desc&startblock='+last.blockNumber : ''}`;
            const res = await  Functions.http(url);
            return  res.status * 1 ===1 ? res.result : [];
        case 'WAVES':
            url = `${network.api}/transactions/address/${network.mainAddress}/limit/500${(last && false)? '?after='+last.hash : ''}`;
            const ret =  await  Functions.http(url);
            return ret[0];
        default: return []
    }
}

function adaptTransaction(network, trxSrc){
    let tx = {network:network.name};
    let data;
    switch(network.provider){
        case 'ETH':
            Object.assign(tx,trxSrc);
            tx.value = web3.utils.fromWei(trxSrc.value);
            try {
                data =JSON.parse(web3.utils.hexToAscii(trxSrc.input));
            } catch (e) {
                return false;
            }

            if(!data.gameId) return false;

            tx.gameId = data.gameId;
            tx.game = data.game;
            tx.gameData = data.gameData;

            break;
        case 'WAVES':
            console.log(trxSrc.hash)
            try{
                data = JSON.parse(Base58.decode(trxSrc.attachment));
            }catch (e) {
                return false;
            }

            if(!data.gameId) return false;
            tx.hash=trxSrc.id;
            tx.value=trxSrc.amount/100000000;
            tx.to = trxSrc.recipient;
            tx.from = trxSrc.sender;
            tx.timeStamp = Math.ceil(trxSrc.timestamp/1000);
            tx.game = data.game;
            tx.gameId = data.gameId;
            tx.gameData = data.gameData;

            break;
        default: return false;
    }

    tx.direction = network.mainAddress.toLowerCase() === tx.to.toLowerCase() ? 'in':'out';
    tx.paymentId = data.payment;
    console.log(tx.hash);
    return tx;
}

