import React from 'react';
import { withRouter, Route,  Switch } from 'react-router-dom';
import {inject, observer} from 'mobx-react';
import LotteryHome from './view/lottery/lottery-home';
import LotteryCodes from "./view/lottery/lottery-Codes";
import LotteryWinners from "./view/lottery/lottery-Winners";
import LotteryMembers from "./view/lottery/lottery-Members";
import LotteryPromo from "./view/lottery/lottery-Promo";
import PriceBetHome from "client/view/price-bet/price-bet-home";
import LotteryLayout from "client/view/lottery/lottery-Layout";
import PriceBetLayout from "client/view/price-bet/price-bet-Layout";
import PriceBetCreate from "client/view/price-bet/price-bet-create";
import PriceBetView from "client/view/price-bet/price-bet-view";


@inject('store') @withRouter @observer
class Routes extends React.Component {

/*
    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this.props.store.alert.isOpen = false;
        }
    }
*/


    render() {
        return <>
            <Switch>
                <Route exact path='/' render={props=><LotteryHome language={this.props.language} {...props}/>}/>
                <Route path='/lottery' exact={true} render={props=><LotteryHome language={this.props.language} {...props}/>}/>
                <Route path='/lottery/codes' render={props=><LotteryCodes language={this.props.language} {...props}/>}/>
                <Route path='/lottery/winners' render={props=><LotteryWinners language={this.props.language} {...props}/>}/>
                <Route path='/lottery/members' render={props=><LotteryMembers language={this.props.language} {...props}/>}/>
                <Route path='/lottery/promo/:code' render={props=><LotteryPromo language={this.props.language} {...props}/>}/>

                <Route path='/price-bet' exact={true} render={props=><PriceBetHome language={this.props.language} {...props}/>}/>
                <Route path='/price-bet/create' render={props=><PriceBetCreate language={this.props.language} {...props}/>}/>
                <Route path='/price-bet/view/:txid' render={props=><PriceBetView language={this.props.language} {...props}/>}/>

            </Switch>
        </>;
    };
}

export default Routes