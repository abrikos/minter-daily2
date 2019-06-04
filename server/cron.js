require = require("esm")(module)
const fs = require('fs');
//const App = require('./minter-app');
const m  = require( '../client/lib/MinterCore');
const App = m.default
const argv = require('minimist')(process.argv.slice(2));
const moment = require('moment');

console.log('====================================== ',moment().format('YYYY-MM-DD HH:mm'),' ====================================================');
init(argv);

async function init(argv) {
    await App.loadTtransactions();
    if (argv.day) {
        dailyWinner();
    } else if (argv.minute) {
        sendPromoCode();

    } else if (argv.minute5) {
        payForPromo();

    } else if (argv.hour) {

    }

}


function dailyWinner() {
    const validPromos = App.getValidCodes();
    const dayTxsIn = App.getTransactionsIn().filter(t => moment(t.timestamp).unix() > moment().subtract(1, 'days').startOf('day').unix());
    const dayTxsOut = App.getTransactionsPayPromo().filter(t => moment(t.timestamp).unix() > moment().subtract(1, 'days').startOf('day').unix());
    if (!dayTxsIn.length) return;

    const players = []
    for (const tx of dayTxsIn) {
        if (validPromos.indexOf(tx.message) !== -1) {
            for (let i = 0; i < App.config.promoUp; i++) {
                players.push(tx)
            }
        } else {
            players.push(tx)
        }
    }
    const prize = App.getPrize();
    if (prize <= 0) return ;
    const winner = players[Math.floor(Math.random() * players.length)];
    console.log(winner, prize)
    App.sendToWinner(winner, prize);
}


async function sendPromoCode(txList) {
    const inputTxs = App.getTransactionsIn(txList);
    const codesSent = App.getTransactionsSentCodes(txList);

    const noCodesSent = inputTxs.filter(tx => codesSent.map(t => t.to).indexOf(tx.from) === -1);
    for (const txData of noCodesSent) {
        await App.sendCode(txData.from).catch(console.error)
    }
};

async function payForPromo(txList) {
    // All transactions except from main address, No code and Less than price
    const payedPromo = App.getTransactionsPayPromo();
    for (const txData of App.getTransactionsWithValidPromo(txList)) {
        //get parent address from Message
        if (payedPromo.map(tx => tx.hash).indexOf(txData.hash) === -1 && txData.value >= App.getPrice()) {
            await App.payPromo(txData);
        }
    }
}

