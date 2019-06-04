import {action, observable} from "mobx";
import config from './lib/config'
import Minter from "./lib/MinterCore";


class AppStore {
    @observable alert = {isOpen: false};
    @observable config = config;
    @observable Minter = Minter;


    @action init = async () => {
        await this.Minter.loadTtransactions();
        console.log('Store init');

    };


}

//window.APP_STORE = new AppStore();
export default new AppStore();