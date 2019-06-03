import React, { Component } from 'react';
import {observable} from "mobx";
import {Provider, observer} from 'mobx-react';
import { Router } from 'react-router-dom';
import Context from './context';
import { createBrowserHistory as createHistory } from 'history';
import Routes from './Routes';
import STORE from './AppStore';
import TopMenu from "./TopMenu";
import {Alert, Button, Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle} from "reactstrap";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import i18n from "./i18n";
import './css/App.css';

library.add(faEdit)

@observer
class App extends Component {
    @observable balance = 0;
    @observable address = '';
    @observable store = '';
    @observable version = '[AIV]V:{version} {date}[/AIV]';

	constructor (props) {
		super (props);
        this.store = STORE;
		this.register = !!props.register || false;
		this.history = props.history  || createHistory (this.props);
	}

	onDismiss = ()=> {
		this.store.alert.isOpen = false;
	};

	render() {
		let { rootPath, ...props } = this.props;

		const alertProps = this.store.alert;
		return (
			<Provider store={this.store}>
				<Router history={this.history}>
					<Context.Provider value={{rootPath}}>
						<div className='container-fluid'>
							<TopMenu/>
							<Alert toggle={this.onDismiss} {...alertProps}/>
							<div className={'container'}>
								<div className={'row'}>
									<div className={'col-8'}>
										<Routes store={this.store} {...props}/>
									</div>
									<div className={'col-4'}>


											<Card className={'m-4'}>
												<CardBody>
													<CardTitle>Приз на {new Date().toLocaleDateString()}</CardTitle>
													<CardSubtitle><span className={'big5'}>{this.store.serverData.balance}</span> BIP</CardSubtitle>
													<CardText>Участников: {this.store.serverData.players}</CardText>
												</CardBody>
											</Card>


									</div>

								</div>

							</div>


							<footer className="footer">
								<div className="footer__container u-container u-container--large"><img
									src="https://console.minter.network/img/minter-logo-white.svg" alt="Minter" className="footer__logo"/>
									<div className="footer__menu">
										<div className="footer__menu-item"><a href="https://www.minter.network/"
																			  target="_blank" rel="nofollow noopener"
																			  className="footer__link link--hover">Intro</a>
										</div>
										<div className="footer__menu-item"><a href="https://about.minter.network/"
																			  target="_blank" rel="nofollow noopener"
																			  className="footer__link link--hover">Network</a>
										</div>
										<div className="footer__menu-item"><a href="https://console.minter.network/"
																			  target="_blank" rel="nofollow noopener"
																			  className="footer__link link--hover">Console</a>
										</div>
										<div className="footer__menu-item"><a href="https://status.minter.network/"
																			  target="_blank" rel="nofollow noopener"
																			  className="footer__link link--hover">Status</a>
										</div>
										<div className="footer__menu-item"><a href="https://explorer.minter.network/"
																			  target="_blank" rel="nofollow noopener"
																			  className="footer__link link--hover">Explorer</a>
										</div>
										<div className="footer__menu-item"><a href="https://github.com/MinterTeam"
																			  target="_blank" rel="nofollow noopener"
																			  className="footer__link link--hover">API &amp; SDK</a>
										</div>
										<div className="footer__menu-item"><a href="https://docs.minter.network"
																			  target="_blank" rel="nofollow noopener"
																			  className="footer__link link--hover">Docs</a>
										</div>
									</div>
								</div>
							</footer>

						</div>
					</Context.Provider>
				</Router>
			</Provider>
		);
	}
}

export default App;
