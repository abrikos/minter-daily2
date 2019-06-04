import React, {Component} from 'react';
import {inject} from 'mobx-react';
import {createBrowserHistory as createHistory} from 'history';
import Routes from './Routes';
import TopMenu from "./TopMenu";
import {Alert, Card, CardBody, CardSubtitle, CardText, CardTitle} from "reactstrap";
import './css/App.css';
import './css/minter.css';


@inject('store')
class Layout extends Component {

    constructor(props) {
        super(props);
        this.store = props.store;
        this.register = !!props.register || false;
        this.history = props.history || createHistory(this.props);
        this.balance = props.store.Minter.getPrize().toFixed(2);
        this.players = props.store.Minter.getDailyTransactions().length;

    }


    onDismiss = () => {
        this.store.alert.isOpen = false;
    };

    render() {
        let {rootPath, ...props} = this.props;

        const alertProps = this.store.alert;
        return (
            <div>
                <TopMenu/>
                <Alert toggle={this.onDismiss} {...alertProps}/>
                <div className={'container'}>
                    <div className={'row'}>
                        <div className={'col-md-8'}>
                            <Routes store={this.store} {...props}/>
                        </div>
                        <div className={'col-md-4'}>


                            <Card>
                                <CardBody>
                                    <CardTitle>Приз на {new Date().toLocaleDateString()}</CardTitle>
                                    <CardSubtitle><span
                                        className={'big5'}>{this.balance}</span> BIP</CardSubtitle>
                                    <CardText>Участников: {this.players}</CardText>
                                </CardBody>
                            </Card>


                        </div>

                    </div>

                </div>


                <footer className="footer">
                    <div className="footer__container u-container u-container--large"><img
                        src="https://console.minter.network/img/minter-logo-white.svg" alt="Minter"
                        className="footer__logo"/>
                        <div className="footer__menu">
                            <div className="footer__menu-item"><a href="https://www.minter.network/"
                                                                  target="_blank"
                                                                  rel="nofollow noopener noreferrer"
                                                                  className="footer__link link--hover">Intro</a>
                            </div>
                            <div className="footer__menu-item"><a href="https://about.minter.network/"
                                                                  target="_blank"
                                                                  rel="nofollow noopener noreferrer"
                                                                  className="footer__link link--hover">Network</a>
                            </div>
                            <div className="footer__menu-item"><a href="https://console.minter.network/"
                                                                  target="_blank"
                                                                  rel="nofollow noopener noreferrer"
                                                                  className="footer__link link--hover">Console</a>
                            </div>
                            <div className="footer__menu-item"><a href="https://status.minter.network/"
                                                                  target="_blank"
                                                                  rel="nofollow noopener noreferrer"
                                                                  className="footer__link link--hover">Status</a>
                            </div>
                            <div className="footer__menu-item"><a href="https://explorer.minter.network/"
                                                                  target="_blank"
                                                                  rel="nofollow noopener noreferrer"
                                                                  className="footer__link link--hover">Explorer</a>
                            </div>
                            <div className="footer__menu-item"><a href="https://github.com/MinterTeam"
                                                                  target="_blank"
                                                                  rel="nofollow noopener noreferrer"
                                                                  className="footer__link link--hover">API &amp; SDK</a>
                            </div>
                            <div className="footer__menu-item"><a href="https://docs.minter.network"
                                                                  target="_blank"
                                                                  rel="nofollow noopener noreferrer"
                                                                  className="footer__link link--hover">Docs</a>
                            </div>
                        </div>
                    </div>
                </footer>

            </div>
        );
    }
}

export default Layout;
