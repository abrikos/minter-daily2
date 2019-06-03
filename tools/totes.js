const path = require('path');
const server = require(path.resolve(__dirname, '../server/server'));
const Functions = require('./functions')
const CONF = require('../client/config');
const web3 = require('web3');
const ethers = require('ethers');
const { transfer, broadcast } = require('waves-transactions');
const Base58 = require('base58-string');
require('dotenv').config();

updateTotes();
closeTotes();
sendPayments();


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
        for(const transaction of tote.transactions().filter(t=>t.to.toLowerCase()===CONF.networks.find(n=>n.name===t.network).mainAddress.toLowerCase())){
            totalSum += transaction.value * CONF.percent;
            console.log('TX:',transaction.id);
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
            console.log('WINNER:', rest)
            server.models.payment.create(rest)
                .then(r=>console.log('Create winner #', winner.id)).catch(console.error)
            //await sendTx(winner.from,winner.value *  totalSum / winSum, {game:'tote',id:tote.id});
        }

        tote.closed = true;
        tote.save().then(r=>console.log('CLOSE TOTE', r.id)).catch(console.error)
    }



}

async function sendPayments(){
    //return sendTx('0x81De3B977F5b7050712DB57e94056832d446E692',0.002,{test:1,sdfsdfs:999,dfgdfgfdgd:1000});

    const payments = await server.models.payment.find({where:{hash:null}});
    for(const payment of payments){
        let data = payment.paymentData;
        data.payment = payment.id;

        payment.hash = await sendTx(payment.network,payment.from,payment.value,data);
        console.log('PAY to', payment.id, payment.hash);
        if(payment.hash)
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
                attachment: Base58.encode(JSON.stringify(data))
                //timestamp: Date.now(),
                //fee: 100000,
            };
            const res =  transfer(params, process.env.WAVES_PRIV_KEY)
            const res2 = await broadcast(res,'https://testnode1.wavesnodes.com');
            console.log('WAVES: result', res2)
            return res2.id;

    }
}

