const config = require("./config");
//const api = `https://${config.mainNet}/api/v1`;
const moment = require('moment');
const axios = require("axios");
const minterCore = require('minter-js-sdk');
require('dotenv').config()


class Minter {


    constructor() {
        this.config = config;
        this.network = config[config.net];
        this.WinnerType = "winner";
    }

    async loadTtransactions(address) {
        //this.transactions = await this.getTransactionsList().catch(e => console.log(e));
        const list = await this.explorer(`/addresses/${address}/transactions`)
        this.transactions = list.map(tx => {
            const message = this.decode(tx.payload);
            tx.value = parseFloat(tx.data.value);
            tx.to = tx.data.to;
            try {
                tx.message = JSON.parse(message);
            } catch (e) {
                tx.message = message;
            }
            return tx;
        }).filter(tx => tx.message !== 'this is a gift');
        const dayMarks = this.transactions.filter(tx => tx.message && tx.message.type === this.WinnerType);
        let lastDate;

        for (const tx of dayMarks) {
            const time = tx.txn;
            if (!lastDate) {
                lastDate = time;
                continue;
            }
            if (lastDate < time) {

                lastDate = time;
            }
        }


        this.transactionsDay = lastDate ? this.transactions.filter(t => t.txn > lastDate) : this.transactions;
        this.transactionsIn = this.transactionsDay.filter(t => t.from !== address);
        this.transactionsOut = this.transactionsDay.filter(t => t.from === address);
        this.transactionsWinners = this.transactions.filter(t => t.from === address && t.message && t.message.type === this.WinnerType);
    }

    async sendToWinner(game, winner, amount) {
        await this.send(game, winner.from, amount, {message: this.config.games[game].name + ": You Win!", type: this.WinnerType, hash: winner.hash});
    }

    async getLastBlock() {
        return await this.explorer('/blocks');
    }

    async send(game, address, amount, message) {
        const minterSDK = new minterCore.Minter({apiType: 'node', baseURL: this.network.apiUrl});

        const txParams = new minterCore.SendTxParams({
            privateKey: process.env[`PK_${game}_${this.config.net}`],
            chainId: this.network.chainId,
            address,
            amount,
            coinSymbol: this.network.symbol,
            gasPrice: 1,
            message: typeof message === "string" ? message : JSON.stringify(message),
        });
        //console.log('TxParams', txParams)
        try {
            return await minterSDK.postTx(txParams)
        } catch (error) {
            //const errorMessage = error.response.data ? error.response.data.error : error;
            console.error('ERROR', error);
        }
    };

    async getTransaction(tx) {
        return await this.explorer(`/transactions/${tx}`)
    };


    async explorer(action) {
        try {
            const res = await axios(`${this.network.explorerUrl}${action}`)
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
