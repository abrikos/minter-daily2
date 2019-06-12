import Lottery from "./lib/LotteryTransactions";
import PriceBet from "./lib/PriceBetTransactions";
import MinterTransactions from "./lib/MinterTransactions";


class AppStore {
    alert = {isOpen: false};
    config = MinterTransactions.config;
    coin = MinterTransactions.network.symbol;


    init = async () => {
        this.Lottery = Lottery;
        await this.Lottery.init();
        //await Lottery.init();
        //await PriceBet.init();
        console.log('Store init');

    };


}

//window.APP_STORE = new AppStore();
export default new AppStore();