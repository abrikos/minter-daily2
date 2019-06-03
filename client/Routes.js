import React from 'react';
import { withRouter, Route,  Switch } from 'react-router-dom';
import {inject, observer} from 'mobx-react';
import Home from './home';

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
            </Switch>
        </>;
    };
}

export default Routes