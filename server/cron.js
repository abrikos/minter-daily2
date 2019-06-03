const fs = require('fs');
const App = require('./minter-app');
const argv = require('minimist')(process.argv.slice(2));
const config = require('./config');


if (argv.day) {
    dailyWinner();
} else if (argv.minute) {
    aggregateTransactions();
}


async function dailyWinner() {
    const balance = App.getBalance()
    console.log(balance);
}




async function aggregateTransactions() {

    const txList = await App.getTransactionsList().catch(e=>console.log(e));
    // All transactions except from main address, No code and Less than price
    for (const txData of txList) {
        //console.log(txData); continue;
        //get parent address from Message
        const addressRequestToPay = App.decode(txData.payload);

        //check for valid transactions from parent address
        const transactionsPayedFromRequestedAddr = txList.filter(tx=>(tx.block<=txData.block) && (tx.from===addressRequestToPay) && (parseFloat(tx.data.value) >= App.config.price));

        //Check payments for txData transaction
        const transactionsPayedToRequestedAddr = txList.filter(tx=>(tx.block>=txData.block) && (App.decode(tx.payload)===txData.hash) && tx.data.to===App.decode(txData.payload));
        console.log('FROM', transactionsPayedFromRequestedAddr.length, 'TO', transactionsPayedFromRequestedAddr.length);

        if(transactionsPayedFromRequestedAddr.length && !transactionsPayedToRequestedAddr.length){
            const amount = App.config.price * App.config.percent;
            console.log(`PAY ${amount} TO`,  addressRequestToPay, 'FOR', txData.hash)
            await App.send(addressRequestToPay, amount, txData.hash);
        }


    }
}


async function createDataFile() {
    const balance = await App.getBalance()
    const json = JSON.stringify({
        //payed: payed.toFixed(2),
        balance: balance.toFixed(2),
        percentDaily: config.percentDaily,
        percent: config.percent,
        price: config.price,
        appName: config.appName,
        address: App.address,
    });
    console.log(json)
    fs.writeFile(`${__dirname}/../build/data.json`, json, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }

        console.log("JSON file has been saved.");
    });

    fs.writeFile(`${__dirname}/../public/data.json`, json, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }

        console.log("JSON file has been saved.");
    });
}