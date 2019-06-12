const axios = require('axios');
const m = require('./MinterTransactions');
const Minter = m.default;

class PriceBetTransactions {
    constructor() {
        this.config = Minter.config.games.priceBet;
        this.address = this.config.address;

    }

    async init() {
        await Minter.loadTtransactions(this.address);
    }

    async cryptocompare(action,from,to,time,limit) {
        const url = `https://min-api.cryptocompare.com/data/${action}?fsym=${from}&tsym=${to}&tsyms=${to}&ts=${time}&limit=${limit || 100}&extraParams=your_app_name`;
        try {
            const res = await axios(url)
            console.log('PB',res.data.Data)
            return res.data.Data
        } catch (e) {
            return console.error(e.response.status, e.response.config.url)
        }
    }

    async test(){
        await this.cryptocompare('histohour', 'BTC','USD',0);

    }

}

export default new PriceBetTransactions()