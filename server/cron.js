const fs = require('fs');
const App = require('./minter-app');
const argv = require('minimist')(process.argv.slice(2));
const moment = require('moment');

console.log('====================================== ',moment().format('YYYY-MM-DD HH:mm'),' ====================================================');
init(argv);

async function init(argv) {
    await App.init();
    if (argv.day) {
        await dailyWinner();
        await fileWinners()
    } else if (argv.minute) {
        sendPromoCode();

    } else if (argv.minute5) {
        fileValidPromos();
        payForPromo();
        fileConfigData();

    } else if (argv.hour) {

    }

}


async function dailyWinner() {
    const validPromos = await App.getValidCodes();
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
    await App.sendToWinner(winner, prize);
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


function txAlreadyPayed(txData, txList) {
    const arr = txList.filter(tx => App.txIsPromoPayment(tx) && tx.message.payedFor === txData.hash);
    return arr.length > 0;
}


async function fileValidPromos() {
    const validPromos = App.getValidCodes();
    console.log(validPromos)
    writeDataFiles('promos', validPromos);
}

async function fileWinners() {
    const validPromos = App.getTransactionsWinner();
    console.log(validPromos)
    writeDataFiles('winners', validPromos);
}


function fileConfigData() {
    const balance = App.getPrize().toFixed(2);
    const players = App.getPlayers().length;
    const config = App.config;
    const json = {
        //payed: payed.toFixed(2),
        players,
        balance,
        percentDaily: config.percentDaily,
        percent: config.percent,
        price: config.price,
        appName: config.appName,
        promoUp: config.promoUp,
        address: App.address,
    };
    writeDataFiles('data', json);

}

function writeDataFiles(name, json) {
    fs.writeFile(`${__dirname}/../build/${name}.json`, JSON.stringify(json), 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }

        console.log(name, "saved into build.");
    });

    fs.writeFile(`${__dirname}/../public/${name}.json`, JSON.stringify(json), 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }

        console.log(name, "saved into public.");
    });
}