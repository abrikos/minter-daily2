import React from 'react';
import { withRouter, Route,  Switch } from 'react-router-dom';
import {inject, observer} from 'mobx-react';
import PageHome from './pages/page-home';
import PagePromos from "./pages/page-Promos";
import PageWinners from "./pages/page-Winners";
import PageMembers from "./pages/page-Members";

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
                <Route path='/promos' component={PagePromos}/>
                <Route path='/winners' component={PageWinners}/>
                <Route path='/members' component={PageMembers}/>
            </Switch>
        </>;
    };
}

export default Routes