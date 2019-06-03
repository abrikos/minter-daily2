require('dotenv').config();
const config = require("./config");
//const api = `https://${config.mainNet}/api/v1`;
const network = config.mainNet;

const axios = require("axios");
const minter = require('minter-js-sdk')
const minterSDK = new minter.Minter({apiType: 'node', baseURL: network.apiUrl});


class MinterApp {
    constructor(){
        this.address = network.address;
        this.config = config;
    }

    async getBalance(){
        const wallet = await this.explorer(`/addresses/${this.address}`);
        return parseFloat(wallet.balances.find(b=>b.coin==='BIP').amount)
    }

    async getTransactionsList() {
        return await this.explorer( `/addresses/${this.address}/transactions`)
    };

    async getValidTransactionsList() {
        const txList = await this.getTransactionsList();
        return txList.filter(t=>t.from!==this.address && parseFloat(t.data.value)>=this.config.price)
    };

    async getTransaction(tx) {
        return await this.explorer('/transactions', `/${tx}`)
    };

    async sendCode(address, code) {
        return await this.send(address, 0, code)
    };

    async send(address, amount, message) {
        const txParams = new minter.SendTxParams({
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
            console.error(error);
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


module.exports = new MinterApp();