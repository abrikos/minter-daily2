const config = require("./config");
//const api = `https://${config.mainNet}/api/v1`;
const network = config.mainNet;
const moment = require('moment');
const axios = require("axios");
const minterCore = require('minter-js-sdk')
const minterSDK = new minterCore.Minter({apiType: 'node', baseURL: network.apiUrl});


class Minter {


    constructor() {
        this.address = network.address;
        this.config = config;
        this.codePrepend = 'MD-PROMO-';
        this.types = {
            payPromo: 'promo-payment',
            sendCode: 'send-code',
            winner: this.config.appName + ': You win!'
        };
    }

    async loadTtransactions() {
        this.transactions = await this.getTransactionsList().catch(e => console.log(e));
    }

    getPrice() {
        return this.config.price;
    };

    getDailyTransactions(){
        return this.getTransactionsIn().filter(t => moment(t.timestamp).unix() > moment().subtract(1, 'days').startOf('day').unix());
    }

    getPrize() {
        const dayTxsIn = this.getDailyTransactions()
        const dayTxsOut = this.getTransactionsPayPromo().filter(t => moment(t.timestamp).unix() > moment().subtract(1, 'days').startOf('day').unix());
        let sum = 0;
        for (const tx of dayTxsIn) {
            sum += tx.value;
        }
        let diff = 0
        for (const tx of dayTxsOut) {
            diff -= tx.value;
        }
        return (sum + diff) * this.config.percentDaily;

    }

    async getBalance() {
        const wallet = await this.explorer(`/addresses/${this.address}`);
        return parseFloat(wallet.balances.find(b => b.coin === 'BIP').amount)
    }


    async getTransactionsList() {
        const list = await this.explorer(`/addresses/${this.address}/transactions`)
        return list.map(tx => {
            const message = this.decode(tx.payload);
            tx.value = parseFloat(tx.data.value);
            tx.to = tx.data.to;
            try {
                tx.message = JSON.parse(message);
            } catch (e) {
                tx.message = message;
            }
            return tx;
        });
    };

    getTransactionsIn() {
        //const txList = await this.getTransactionsList();
        return this.transactions.filter(t => t.from !== this.address)
    };

    getTransactionsOut() {
        //const txList = await this.getTransactionsList();
        return this.transactions.filter(t => t.from === this.address)
    };

    getValidCodes() {
        return this.getTransactionsSentCodes().map(tx => tx.message)
    }

    getTransactionsWinner() {
        return this.getTransactionsOut().filter(t => t.message.type === this.types.winner)
    }

    async sendToWinner(winner, amount) {
        console.log(winner.from, amount, JSON.stringify({type: this.types.winner}));
        await this.send(winner.from, amount, JSON.stringify({type: this.types.winner, hash:winner.hash}));
    }

    getTransactionsWithValidPromo() {
        //const txList = await this.getTransactionsList();
        const codesSent = this.getValidCodes();
        return this.getTransactionsIn().filter(t => t.message && (typeof t.message === "string") && codesSent.indexOf(t.message) !== -1)
    };

    getTransactionsSentCodes() {
        return this.getTransactionsOut().filter(t => (typeof t.message === "string") && t.message.indexOf(this.codePrepend) !== -1)
    };

    getTransactionsPayPromo() {
        return this.getTransactionsOut().filter(t => t.message && t.message.type === this.types.payPromo)
    };

    async payPromo(txData) {
        const codesSent = this.getValidCodes();
        if (codesSent.indexOf(txData.message) === -1) return;
        const amount = this.getPrice() * this.config.percent;
        const message = JSON.stringify({type: this.types.payPromo, payedFor: txData.hash, code: txData.message});
        console.log('PAY:', txData.from, amount, message);
        await this.send(txData.from, amount, message);
    }

    generateCode() {
        return this.codePrepend + new Date().valueOf();
    }

    async getTransaction(tx) {
        return await this.explorer('/transactions', `/${tx}`)
    };

    async sendCode(address) {
        return await this.send(address, 0, this.generateCode())
    };

    async send(address, amount, message) {
        const txParams = new minterCore.SendTxParams({
            privateKey: process.env[network.test ? 'PRIVATE_KEY_TEST' : 'PRIVATE_KEY_MAIN'],
            chainId: 1,
            address,
            amount,
            coinSymbol: network.symbol,
            gasPrice: 1,
            message,
        });
        console.log('TxParams', txParams)
        try {
            return await minterSDK.postTx(txParams)
        } catch (error) {
            //const errorMessage = error.response.data ? error.response.data.error : error;
            console.error(error.response);
        }
    };


    async explorer(action) {
        try {
            const res = await axios(`${network.explorerUrl}${action}`)
            return res.data.data
        } catch (e) {
            return console.error(e.response.status, e.response.config.url)
        }
    };

    decode(value) {
        return Buffer.from(value, 'base64').toString('ascii')
    };
};


export default new Minter()
