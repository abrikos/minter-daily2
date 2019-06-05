require = require("esm")(module)
//const Minter = require('./minter-app');
//const m  = require( '../client/lib/MinterCore');
//const Minter = m.default
const l  = require( '../client/lib/Lottery');
const Lottery = l.default
const argv = require('minimist')(process.argv.slice(2));
const moment = require('moment');

console.log('====================================== ',moment().format('YYYY-MM-DD HH:mm'),' ====================================================');
init(argv);

async function init(argv) {
    await Lottery.init();
    if (argv.day) {
        Lottery.dailyWinner();
    } else if (argv.minute) {
        Lottery.sendPromoCode();

    } else if (argv.minute5) {
        Lottery.payForPromo();

    } else if (argv.hour) {

    } else if (argv.test) {
        Lottery.test();
    }

}



