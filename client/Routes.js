import React from 'react';
import { withRouter, Route,  Switch } from 'react-router-dom';
import {inject, observer} from 'mobx-react';
import Home from './pages/home';
import Promos from "./pages/Promos";

@inject('store') @withRouter @observer
class Routes extends React.Component {

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this.props.store.alert.isOpen = false;
        }
    }


    render() {
        return <>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/promo/:code' component={Home}/>
                <Route path='/promos' component={Promos}/>
            </Switch>
        </>;
    };
}

export default Routes