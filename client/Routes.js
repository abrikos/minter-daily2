import React from 'react';
import { withRouter, Route,  Switch } from 'react-router-dom';
import {inject, observer} from 'mobx-react';
import LotteryHome from './view/lottery/lottery-home';
import LotteryCodes from "./view/lottery/lottery-Codes";
import LotteryWinners from "./view/lottery/lottery-Winners";
import LotteryMembers from "./view/lottery/lottery-Members";
import LotteryPromo from "./view/lottery/lottery-Promo";

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
                <Route exact path='/' component={LotteryHome}/>
                <Route path='/promo/:code' component={LotteryPromo}/>
                <Route path='/lottery/codes' component={LotteryCodes}/>
                <Route path='/lottery/winners' component={LotteryWinners}/>
                <Route path='/lottery/members' component={LotteryMembers}/>
            </Switch>
        </>;
    };
}

export default Routes