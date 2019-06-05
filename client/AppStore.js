import Lottery from "./lib/Lottery";


class AppStore {
    alert = {isOpen: false};
    config = Lottery.config;
    address = Lottery.address;
    balance = 0;
    Lottery = Lottery;


    init = async () => {
        //await this.Minter.loadTtransactions(this.address);
        await this.Lottery.init();
        this.balance = this.Lottery.getPrize().toFixed(2);
        /*setInterval(async ()=>{
            //await this.Lottery.init();
            this.balance = this.Lottery.getPrize().toFixed(2);
        }, 1000)*/

        console.log('Store init');

    };


}

//window.APP_STORE = new AppStore();
export default new AppStore();