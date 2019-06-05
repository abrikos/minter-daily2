const moment = require('moment');
const m = require('./MinterCore');
const Minter = m.default;

class Lottery {
    constructor() {
        this.config = Minter.config.games.lottery;
        this.address = this.config.wallet[Minter.config.net];

        this.codePrepend = 'MD-PROMO-';
        this.types = {
            payPromo: 'promo-payment',
            sendCode: 'send-code',
            winner: this.config.name + ': You win!'
        };
    }

    async init() {
        this.counter = new Date().valueOf();
        await Minter.loadTtransactions(this.address);
    }
    async getLastBlock(){
        return await Minter.getLastBlock()
    }


    getPrice() {
        return this.config.price;
    };

    test() {
        Minter.sendDayMark('lottery', this.address)
        //console.log(this.getTransactionsSentCodes())
    }

    async dailyWinner() {
        const players = [];
        for (const tx of this.getPlayersList()) {
            for (let i = 0; i < tx.promoChance; i++) {
                players.push(tx)
            }
        }
        const prize = this.getPrize();
        if (prize <= 0) return;
        const winner = players[Math.floor(Math.random() * players.length)];
        console.log(winner.txn, winner.promoChance, prize);
        await Minter.sendToWinner('lottery', winner, prize);
        //await Minter.sendDayMark('lottery',this.address);

    }


    async sendPromoCode() {
        const inputTxs = Minter.transactionsIn;
        const codesSent = this.getTransactionsSentCodes();
        const noCodesSent = inputTxs.filter(tx => codesSent.map(t => t.to).indexOf(tx.from) === -1);
        const sent = []
        for (const txData of noCodesSent) {
            sent.push(await this.sendCode(txData.from).catch(console.error))
        }
        return sent;
    };

    async payForPromo() {
        // All transactions except from main address, No code and Less than price
        const payedPromo = this.getTransactionsPayPromo();
        for (const txData of Minter.transactionsIn) {
            //if(txData.hash!=='Mtd81f7cfb8a3636e5dc3372b7ae6669f5d3e54b97cda5b7f547daa2110db273ad') continue
            //get parent address from Message
            if (payedPromo.map(tx => tx.message.payedFor).indexOf(txData.hash) === -1 && txData.value >= this.getPrice()) {
                //console.log(payedPromo.map(tx => tx.message),txData.hash)
                await this.payPromo(txData);
            }
        }
    };

    getAddressFromPromo(promo) {
        const parentTx = this.getTransactionsSentCodes().filter(t => t.message === promo);
        if (!parentTx.length) return;
        return parentTx[0].to;
    }

    async payPromo(txData) {
        const payAddress = this.getAddressFromPromo(txData.message);
        if (!payAddress) return 'Wrong promo:' + txData.message;
        const amount = this.getPrice() * this.config.percent;
        const message = JSON.stringify({type: this.types.payPromo, payedFor: txData.hash, code: txData.message});
        console.log('PAY:', payAddress, amount, message);
        await Minter.send('lottery', payAddress, amount, message);
    }

    getPlayersList() {
        const validPromos = this.getValidCodes();
        //const dayTxsIn = .filter(t => moment(t.timestamp).unix() > moment().subtract(1, 'days').startOf('day').unix());
        //const dayTxsOut = Minter.getTransactionsPayPromo().filter(t => moment(t.timestamp).unix() > moment().subtract(1, 'days').startOf('day').unix());
        if (!Minter.transactionsIn.length) return [];
        const players = [];
        const price = this.getPrice();
        for (const tx of Minter.transactionsIn) {
            const promo = validPromos.indexOf(tx.message) !== -1 ? this.config.promoChance : 0;

            tx.promoChance = promo + Math.ceil(tx.value/price)
            players.push(tx)
        }
        return players;

    }

    getPlayersCount() {
        return Minter.transactionsIn.length;
    }

    getPrize() {
        const dayTxsIn = Minter.transactionsIn;
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

    getValidCodes() {
        return this.getTransactionsSentCodes().map(tx => tx.message)
    }

    getTransactionsWinner() {
        return Minter.transactionsWinners;
    }

    getTransactionsWithValidPromo() {
        //const txList = await Minter.getTransactionsList();
        const codesSent = this.getValidCodes();
        return Minter.transactionsIn.filter(t => t.message && (typeof t.message === "string") && codesSent.indexOf(t.message) !== -1)
    };

    getTransactionsSentCodes() {
        return Minter.transactions.filter(t => t.from === this.address && (typeof t.message === "string") && t.message.indexOf(this.codePrepend) !== -1)
    };

    getTransactionsPayPromo() {
        return Minter.transactionsOut.filter(t => t.message && t.message.type === this.types.payPromo)
    };


    generateCode() {
        return this.codePrepend + new Date().valueOf();
    }


    async sendCode(address) {
        return await Minter.send('lottery', address, 0, this.generateCode())
    };

}

export default new Lottery()