const fs = require('fs');
const App = require('./minter-app');
const argv = require('minimist')(process.argv.slice(2));
const moment = require('moment');

console.log(moment().format('YYYY-MM-DD HH:mm'));
if (argv.day) {
    dailyWinner();
} else if (argv.minute) {
    promoPayments();

}else if(argv.minute5){
    fileValidPromos();

}else if(argv.hour){
    fileConfigData();
}


async function dailyWinner() {
    const lastDay = moment().unix() - 186400;

    const txList = await App.getValidTransactionsList().catch(e => console.log(e));
    const dayTxs = txList.filter(t => lastDay < moment(t.timestamp).unix() && t.from !== App.address && parseFloat(t.data.value) >= App.config.price);
    if (!dayTxs.length) return;
    let sum = 0;
    const players = []
    for (const tx of dayTxs) {
        sum += parseFloat(tx.data.value);
        if (txHasValidPromo(tx, txList)) {
            console.log(App.config.promoUp)
            for (let i = 0; i < App.config.promoUp; i++) {

                players.push(tx.from)
            }
        } else {
            players.push(tx.from)
        }
    }
    const prize = sum * App.config.percentDaily;
    const winner = players[Math.floor(Math.random() * players.length)];
    console.log(winner, prize)
    await App.send(winner, prize, 'Winner');
}


async function promoPayments() {
    const txList = await App.getTransactionsList().catch(e => console.log(e));
    // All transactions except from main address, No code and Less than price
    for (const txData of txList) {
        //console.log(txData); continue;
        //get parent address from Message
        const addressRequestToPay = App.decode(txData.payload);

        if (!txPayedToParent(txData, txList)) {
            const amount = App.config.price * App.config.percent;
            console.log(`PAY ${amount} TO`, addressRequestToPay, 'FOR', txData.hash)
            await App.send(addressRequestToPay, amount, txData.hash);
        }
    }
}

function txPayedToParent(txData, txList) {
    const arr = txList.filter(tx => (tx.block >= txData.block) && (App.decode(tx.payload) === txData.hash));
    return !!arr;
}


async function fileValidPromos() {
    const txList = await App.getValidTransactionsList().catch(e => console.log(e));
    // All transactions except from main address, No code and Less than price
    const validPromos = ['Mxdbe76e78f9ba5e5ed0c9835b493d4765c8199d4c'];
    for (const txData of txList) {
        //console.log(txData); continue;
        //get parent address from Message
        const addressRequestToPay = App.decode(txData.payload);

        if (txHasValidPromo(txData, txList)) {
            const promo = App.decode(txData.payload);
            if (validPromos.indexOf(promo) === -1) {
                validPromos.push(promo);
            }
        }
    }
    console.log(validPromos)
    writeDataFiles('promos', validPromos);
}


function txHasValidPromo(txData, txList) {
    const promoCode = App.decode(txData.payload);
    if (!promoCode) return false;
    const arr = txList.find(t => t.from === promoCode && t.data.value >= App.config.price && t.block <= txData.block)
    return !!arr;
}


async function fileConfigData() {
    const balance = await App.getBalance();
    const config = App.config;
    const json = {
        //payed: payed.toFixed(2),
        balance: balance.toFixed(2),
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