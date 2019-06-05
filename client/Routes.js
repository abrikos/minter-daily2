import React from 'react';
import { withRouter, Route,  Switch } from 'react-router-dom';
import {inject, observer} from 'mobx-react';
import PageHome from './view/lottery/page-home';
import PagePromos from "./view/lottery/page-Promos";
import PageWinners from "./view/lottery/page-Winners";
import PageMembers from "./view/lottery/page-Members";

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
                <Route exact path='/' component={PageHome}/>
                <Route path='/promo/:code' component={PageHome}/>
                <Route path='/lottery/promos' component={PagePromos}/>
                <Route path='/lottery/winners' component={PageWinners}/>
                <Route path='/lottery/members' component={PageMembers}/>
            </Switch>
        </>;
    };
}

export default Routes