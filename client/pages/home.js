import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router";
import {action, observable} from "mobx";
import {t} from '../Translator'
import {Input, InputGroup, InputGroupAddon} from "reactstrap";
import {Link} from "react-router-dom";
const { MDText } = require('i18n-react');
const T = new MDText({
    greeting: "#Hello, World!\n My name is **{myName}**! \n {{howAreYou}}",
    howAreYou:  "_How do you do?_"
}, { MDFlavor: 1 });

@withRouter @inject('store') @observer
class Home extends Component {
    @observable code = '';
    url = new URL(window.location.href)

    constructor(props) {
        super(props)

        this.parentCode = this.props.match.params.code
    }

    @action changePromo = e => {
        this.code = e.target.value;
    };

    render() {
        const data = this.props.store.serverData ? this.props.store.serverData : {};
        const count=99; const name='fdfd';
        return <ul>
            <li><h2 className={'red'}>{t('Bid address')}: <strong><a href={`https://explorer.minter.network/address/${data.address}`} className={'red'}>{data.address}</a></strong></h2></li>
            <li>{t('Bid %d address',10)} Ежедневно одна из ставок дня получает {data.percentDaily * 100}% от всех ставок  за вычетом реферальных отчислений за день  (день - это сутки)</li>
            <li>Размер ставки: <strong className={'red'}>{data.price}</strong> BIP</li>
            <li className={'text-info'}>Ставка суммой менее <strong                className={'red'}>{data.price}</strong> BIP считается подарком
            </li>
            <li>После того как Вы сделали ставку адрес вашего кошелька становится промо-кодом с помощью которого вы можете получать {data.percent * 100}% с каждой ставки с вашим кодом
                <ul>
                    <li>Промо-код вводится в поле <strong>"Message"</strong> вашего кошелька.</li>
                    {this.parentCode && <li>Введите <strong className={'big2 red'}>{this.parentCode}</strong> при отправке BIP на адрес игры</li>}
                    <li>Ставки с промо-кодом попадают в ежедневный список выбора победителя {data.promoUp} раза</li>
                    <li></li>

                </ul>
            </li>
            <li>Когда кто-то делает ставку с Вашим промо-кодом Вы
                получаете <strong>{(data.price * data.percent).toFixed(2)} BIP</strong> на адрес/промо-код/ (т.е. 3 ваших реферала принесут Вам {(data.price * data.percent * 3).toFixed(2)} BIP)
            </li>
            <li>Вы можете скопировать эту информацию и вставить свой промо-код</li>
            <li>Введите свой промо-код для получения ссылки

                <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">{this.url.origin}</InputGroupAddon>
                    <Input placeholder="Ваш промо-код"
                           aria-label="Ваш промо-код"
                           aria-describedby="basic-addon2"
                           onChange={this.changePromo}/>
                </InputGroup>

                Ваша ссылка: <pre> {this.code ? `${this.url.origin}/promo/${this.code}`:'Введите код'}</pre>


            </li>
        </ul>;
    }
}

export default Home;
