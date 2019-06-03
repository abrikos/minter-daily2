import React, { Component } from 'react';
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router";
import {action, observable} from "mobx";
import {t} from './Translator'
import {FormControl, InputGroup} from "react-bootstrap";


@withRouter @inject('store') @observer
class App extends Component {
	@observable totes = [];
	url = {}

	constructor(props){
		super(props)
	}


	render() {
	    const data = this.props.store.serverData ? this.props.store.serverData : {};
		return <ul>

			<li>Ежедневно один из билетов лотереи получает {data.percentDaily * 100}% от баланса кошелька <strong><a
				href={`https://explorer.minter.network/address/${data.address}`}
				className={'red'}>{data.address}</a></strong></li>
			<li>Кошелек пополняется с покупки билетов</li>
			<li>Стоимость билета: <strong className={'red'}>{data.price}</strong> BIP</li>
			<li>Чтобы купить билет Вам необходимо при переводе BIP указать промо-код <code>this.url.hash.replace('#/','')}</code> в
				поле <strong>"Message"</strong> вашего кошелька.
				<ul>
					<li className={'text-info'}>Транзакция без промо-кода считается подарком</li>
					<li className={'text-info'}>Транзакция суммой менее <strong
						className={'red'}>{data.price}</strong> BIP считается подарком
					</li>
				</ul>
			</li>

			<li>После покупки билета на адрес, с которого вы производилли покупку, Вам приходит транзакция c
				суммой <strong className={'red'}>0</strong> BIP.
			</li>
			<li>В этой транзакции поле <strong>"Message"</strong> содержит Ваш промокод.</li>
			<li>С каждого билета купленного по Вашему промокоду вы
				получаете <strong>{(data.price * data.percent).toFixed(2)} BIP</strong> на адрес с которого покупали
				билет (т.е. 2 ваших реферала принесут Вам {(data.price * data.percent * 2).toFixed(2)} BIP
				- {data.percent * 200}%)
			</li>
			<li>Вы можете скопировать эту информацию и вставить свой промо-код</li>
			<li>Введите свой промо-код для получения ссылки

				<InputGroup className="mb-3">
					{/*<InputGroup.Prepend>
						<InputGroup.Text id="basic-addon2">{this.url.origin}/#/</InputGroup.Text>
					</InputGroup.Prepend>*/}
					{/*<FormControl
						placeholder="Ваш промо-код"
						aria-label="Ваш промо-код"
						aria-describedby="basic-addon2"
						onChange={this.changePromo}
					/>*/}

				</InputGroup>

				Ваша ссылка: <pre> {`${this.url.origin}/#/${this.code}`}</pre>


			</li>
		</ul>;
	}
}

export default App;
