import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router";
import {action, observable} from "mobx";
import {t} from '../Translator'
import {Input, InputGroup, InputGroupAddon} from "reactstrap";




@withRouter @inject('store') @observer
class Home extends Component {
    @observable code = '';
    url = new URL(window.location.href)

    constructor(props) {
        super(props)
        this.address = this.props.store.Minter.address;
        this.parentCode = this.props.match.params.code
    }

    @action changePromo = e => {
        this.code = e.target.value;
    };

    render() {
        const data = this.props.store.config;
        return <div>
            <ul>
                <li><h3 className={'red'}>{t('Bid address', {param: "10"})}: <strong><a
                    href={`https://explorer.minter.network/address/${this.address}`}
                    className={'red'}>{this.address}</a></strong></h3></li>
                <li>Ежедневно одна из ставок дня получает {data.percentDaily * 100}% от всех ставок за вычетом
                    реферальных
                    отчислений за день (день - это сутки)
                </li>
                <li>Размер ставки: <strong className={'red'}>{data.price}</strong> BIP</li>
                <li className={'text-info'}>Ставка суммой менее <strong className={'red'}>{data.price}</strong> BIP
                    считается подарком
                </li>
                <li>После того как Вы сделали ставку на адрес вашего кошелька придет транзакция 0 BIP с Вашим промо-кдом
                    (в поле
                    "Message")
                </li>
                <li>Приглашайте новых участников с помощью Вашего промо-кода и Вы будете получать {data.percent * 100}%
                    с
                    каждой ставки где использован этот промо-код. Партнерские вознаграждения отправляются на тот же
                    адрес куда пришел промо-код.
                </li>

                <li>Можно увеличить шансы получить ежедневный приз. Вводите валидный промо-код в
                    поле <strong>"Message"</strong> при формировании платежа
                </li>
                <li>Каждая ставка с валидным промо-кодом попадает в ежедневный список выбора победителя <span
                    className="red">не один раз, а <span className={'big2'}> {data.promoUp}</span></span></li>

                {this.parentCode &&
                <li>Используйте мой промокод: <strong className={'big2 red'}>{this.parentCode}</strong></li>}


                <li>Вы можете скопировать эту информацию и вставить свой промо-код</li>
                <li>Введите свой промо-код для получения ссылки

                    <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">{this.url.origin + '/'}</InputGroupAddon>
                        <Input placeholder="Ваш промо-код"
                               aria-label="Ваш промо-код"
                               aria-describedby="basic-addon2"
                               onChange={this.changePromo}/>
                    </InputGroup>

                    Ваша ссылка: <pre> {this.code ? `${this.url.origin}/promo/${this.code}` : 'Введите код'}</pre>


                </li>
            </ul>

        </div>
    }
}

export default Home;
