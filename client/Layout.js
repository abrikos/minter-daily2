import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import Routes from './Routes';
import TopMenu from "./TopMenu";
import {Alert, Card, CardBody, CardSubtitle, CardText, CardTitle} from "reactstrap";
import './css/App.css';
import './css/minter.css';
import {observable} from "mobx";
import {t} from './Translator'

@inject('store')
class Layout extends Component {
    @observable balance;

    constructor(props) {
        super(props);
        this.store = props.store;
        this.register = !!props.register || false;


        this.players = props.store.Lottery.getPlayersCount();
        this.balance = props.store.balance;
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
                <div className={'container-fluid py-2'}>
                    {/*{this.props.store.Lottery.counter}*/}
                    <div className={'row'}>
                        <div className={'col-md-8'}>
                            <Routes store={this.store} {...props}/>
                        </div>
                        <div className={'col-md-4'}>


                            <Card>
                                <CardBody>
                                    <CardTitle>{t('Lottery')} </CardTitle>
                                    <CardSubtitle>Приз на {new Date().toLocaleDateString()}: </CardSubtitle>
                                    <strong className={'big5'}>{this.balance}</strong> BIP
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
