import Lottery from "./lib/LotteryTransactions";
import PriceBet from "./lib/PriceBetTransactions";
import MinterTransactions from "./lib/MinterTransactions";
import {Component} from "react";


class AppStore extends Component{
    alert = {isOpen: false};
    config = MinterTransactions.config;
    coin = MinterTransactions.network.symbol;
    network = MinterTransactions.config[MinterTransactions.config.net];


    init = async () => {
        this.Lottery = Lottery;
        await this.Lottery.init();
        this.PriceBet = PriceBet;
        await this.PriceBet.init();
        console.log('Store init');

    };


}

//window.APP_STORE = new AppStore();
export default new AppStore();