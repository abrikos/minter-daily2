const config = require("./config");
const axios = require("axios");



class MinterTransactions {


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

    async getLastBlock() {
        return await this.explorer('/blocks');
    }

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


export default new MinterTransactions()
