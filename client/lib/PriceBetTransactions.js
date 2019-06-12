const axios = require('axios');
const m = require('./MinterTransactions');
const MinterTransactions = m.default;

class PriceBetTransactions {
    constructor() {
        this.config = MinterTransactions.config.games.priceBet;
        this.config.coin = MinterTransactions.config[MinterTransactions.config.net].symbol;

    }

    async init() {
        this.tranasctions = await MinterTransactions.loadTtransactions(this.config.address);
    }

    async cryptocompare(action, from, to, time, limit) {
        const url = `https://min-api.cryptocompare.com/data/${action}?fsym=${from}&tsym=${to}&tsyms=${to}&ts=${time}&limit=${limit || 100}&extraParams=your_app_name`;
        try {
            const res = await axios(url)
            return res.data.Data
        } catch (e) {
            return console.error(e.response.status, e.response.config.url)
        }
    }

    async getPriceHistory(pair) {
        await this.cryptocompare('histohour', pair.from, pair.to, 0);

    }

}

export default new PriceBetTransactions()