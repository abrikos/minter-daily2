import React, { Component } from 'react';
import {observable} from "mobx";
import {Provider, observer} from 'mobx-react';
import { Router } from 'react-router-dom';
import Context from './context';
import { createBrowserHistory as createHistory } from 'history';
import Routes from './Routes';
import STORE from './AppStore';
import TopMenu from "./TopMenu";
import {Alert} from "reactstrap";
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
		console.log(new Date())
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
								<Routes store={this.store} {...props}/>
							</div>
							<footer className={'footer'}>
                                {/*<img src={'/images/logo.png'} alt={'Logo'} width={40}/>*/}
								{/*<small className='float-right text-muted'>{this.version}</small>*/}

							</footer>

						</div>
					</Context.Provider>
				</Router>
			</Provider>
		);
	}
}

export default App;
