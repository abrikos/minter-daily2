import React, {Component} from 'react';
import {observer, Provider} from 'mobx-react';
import {Router} from 'react-router-dom';
import Context from './context';
import {createBrowserHistory as createHistory} from 'history';
import './css/App.css';
import './css/minter.css';
import Layout from "./Layout";


@observer
class App extends Component {


    constructor(props) {
        super(props);
        this.history = props.history || createHistory(this.props);
        this.history.listen((location, action) => {
            // location is an object like window.location
            props.store.init();
            console.log(action, location.pathname, location.state)
        });
    }


    render() {
        let {rootPath} = this.props;
        return (
            <Provider store={this.props.store}>
                <Router history={this.history}>
                    <Context.Provider value={{rootPath}}>
                        <Layout/>
                    </Context.Provider>
                </Router>
            </Provider>
        );
    }
}

export default App;
