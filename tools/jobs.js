const fetch = require('node-fetch');
const withQuery = require('with-query').default;
const CONF = require('../client/config');
const path = require('path');
const server = require(path.resolve(__dirname, '../server/server'));
const web3 = require('web3');
require('dotenv').config();
const ethers = require('ethers');
const { transfer } = require('waves-transactions');
const Base58 = require('base58-string');

//WAVES: https://github.com/wavesplatform/waves-signature-adapter

switch(process.argv[2]){
    case 'hourly': return hourly();
    case 'minute': return minute();
    default:

}


function minute() {
    getCrypto();
    parseTransactions();
    updateTotes();
    closeTotes();
    sendPayments();
}

function hourly(){

}

async function updateTotes() {
    const totes = await server.models.tote.find({include:'transactions',where:{closed:false}});
    for(const tote of totes){
        //if(tote.id> 25)console.log(tote.transactions())
        tote.transactionCount = tote.transactions().length;
        let sum = 0;
        for(const transaction of tote.transactions()){
             sum += transaction.value;
        }
        tote.transactionSum =sum;
        try{
            tote.save().then().catch()
        }catch (e) {

        }
    }
}

async function closeTotes() {
    let prices = {};
    for(const pairs of CONF.crypto){
        const p  = await server.models.crypto.findOne({where:pairs, order:'createdAt desc'});
        prices[`${p.from}-${p.to}`] = p.price;
    }

    const totes = await server.models.tote.find({include:'transactions', where:{date:{lt:new Date()},closed:false}});
    for(const tote of totes){
        console.log('Try to  close tote #',tote.id);
        const price = prices[`${tote.from}-${tote.to}`];
        let winner;
        if(tote.more && tote.less){
            winner = tote.more < price && price < tote.less ? 'For':'Against'
        }else if(tote.more){
            winner = tote.more < price ? 'For':'Against'
        }else{
            winner = price < tote.less ? 'For':'Against'
        }
        let winners = [];
        let winSum = 0;
        let totalSum = 0;
        for(const transaction of tote.transactions().filter(t=>t.to.toLowerCase()===CONF.address.toLowerCase())){
            totalSum += transaction.value * CONF.percent;
            console.log('TX:',transaction.id)
            if (transaction.gameData && transaction.gameData.winner === winner) {
                winners.push(transaction);
                winSum += transaction.value;
            }
        }

        //TODO 5% for tote`s owner

        for(const winner of winners){
            const {id,hash, createdAt,...rest} = JSON.parse(JSON.stringify(winner));
            rest.value = winner.value *  totalSum / winSum;
            rest.paymentData = {game:winner.game, gameId:winner.gameId, gameData:winner.gameData};
            server.models.payment.create(rest)
                .then(r=>console.log('Create winner #', winner.id)).catch(console.error)
            //await sendTx(winner.from,winner.value *  totalSum / winSum, {game:'tote',id:tote.id});
        }

        tote.closed = true;
        //tote.save().then(r=>console.log('CLOSE TOTE', r.id)).catch(console.error)
    }



}

async function sendPayments(){
    //return sendTx('0x81De3B977F5b7050712DB57e94056832d446E692',0.002,{test:1,sdfsdfs:999,dfgdfgfdgd:1000});

    const payments = await server.models.payment.find({where:{hash:null}});
    for(const payment of payments){
        let data = payment.paymentData;
        data.payment = payment.id;

        payment.hash = await sendTx(payment.network,payment.from,payment.value,data);
        console.log('PAY to', payment.id, payment.hash)
        payment.save();
    }
}

async function sendTx(network,newAddress,value,data) {
    const net = CONF.networks.find(n=>n.name===network);
    switch(net.provider){
        case 'ETH':
            let provider = new ethers.providers.EtherscanProvider(net.name);
            let wallet = new ethers.Wallet(process.env.ETH_PRIV_KEY, provider);
            let code = await provider.getCode(newAddress);
            if (code !== '0x') { throw new Error('Cannot sweep to a contract'); }
            //const gasPrice = await provider.getGasPrice();
            const gasPrice = web3.utils.toHex(web3.utils.toWei(net.gasPrice,'gwei'));
            let gasLimit = net.gas;
            const txRaw = {
                gasLimit: gasLimit,
                gasPrice: gasPrice,
                to: newAddress,
                data:web3.utils.toHex(JSON.stringify(data)),
                value: ethers.utils.parseEther(value.toString())
            };

            let tx = await wallet.sendTransaction(txRaw);
            return tx.hash;

        case 'WAVES':
            const params = {
                amount: value*100000000,
                recipient: newAddress,
                //feeAssetId: undefined
                //assetId: undefined
                attachment: JSON.stringify(data)
                //timestamp: Date.now(),
                //fee: 100000,
            };
            return await transfer(params, process.env.WAVES_PRIV_KEY)
    }
}



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
            const res = await  http(url);
            return  res.status * 1 ===1 ? res.result : [];
        case 'WAVES':
            url = `${network.api}/transactions/address/${network.mainAddress}/limit/500${(last && false)? '?after='+last.hash : ''}`;
            const ret =  await  http(url);
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
    console.log(tx.hash)
    return tx;
}

async function  getCrypto() {
    for(const crypto of CONF.crypto){
        const res = await cryptocompare('price', crypto.from, crypto.to, 0);
        await adCrypto(crypto.from,res)
    }
}

async function adCrypto(from,data) {
    for(const to of Object.keys(data)){
        const model = {from, to, price:data[to]*1};
        server.models.Crypto.create(model).then();
    }
}

async function cryptocompare(action,from,to,time) {
    const url = `https://min-api.cryptocompare.com/data/${action}?fsym=${from}&tsyms=${to}&ts=${time}&extraParams=your_app_name`;
    return await http(url)
}

async function http(url) {
    return new Promise((resolve,reject) => {
        fetch(url)
            .then()
            .then(res=>res.json())
            .then(resolve)
            .catch(reject)
    })
}