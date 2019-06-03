import {action, observable} from "mobx";


class AppStore {
    @observable alert = {isOpen: false};
    @observable address = '';
    @observable serverData = {};
    @observable loggedUser = false;


    constructor() {
        fetch('/data.json').then(res => res.json())
            .then(json => {
                console.log(json)
                this.serverData = json
            });

    }

    @action init = async () => {
        console.log('Store init');

    };


}

//window.APP_STORE = new AppStore();
export default new AppStore();