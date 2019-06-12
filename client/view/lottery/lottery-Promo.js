import React, {Component} from "react";
import {Input, InputGroup} from "reactstrap";
import LotteryRules from "./lottery-Rules";
import {inject, observer} from "mobx-react";
import {action, observable} from "mobx";

@inject('store') @observer
class LotteryPromo extends Component {
    @observable code = '';

    @action changePromo = e => {
        this.code = e.target.value;
    };

    url = new URL(window.location.href)

    render() {
        const data = this.props.store.config;
        data.address = this.props.store.Lottery.address;
        data.parentCode = this.props.match.params.code
        return <div>
            <h1>Ежедневная лотерея!</h1>
            <ul className={'big-line-spacing'}>

                <li>Для участия отправьте <strong className={'big2'}>{data.price}</strong>BIP на адрес <strong
                    className={'wallet-address'}><a
                    href={`https://explorer.minter.network/address/${data.address}`}
                    className={'red'}>{data.address}</a></strong>
                </li>
                <li>Используйте мой промо-код и увеличте
                    шансы на выигрыш в <strong className={'big2'}>{data.promoChance}</strong> раза <pre
                        className={'wallet-address red'}>{data.parentCode}</pre></li>
                <li>С каждого купленного по этому промо-коду биплета я получу <strong
                    className={'big2'}>{data.percent * 100}%</strong> его стоимости
                </li>
                <li>После покупки биплета на Ваш кошелек придет транакция 0 BIP с адреса <strong
                    className={'wallet-address'}><a
                    href={`https://explorer.minter.network/address/${data.address}`}
                    className={'red'}>{this.address}</a></strong> где в поле "Message" будет Ваш личный промо-код
                </li>
                <li>Вы можете скопировать эту информацию и вставить свой промо-код</li>
                <li>Введите свой промо-код для получения ссылки

                    <InputGroup className="mb-3">
                        {/*<InputGroupAddon addonType="prepend">{this.url.origin + '/'}</InputGroupAddon>*/}
                        <Input placeholder="Ваш промо-код"
                               aria-label="Ваш промо-код"
                               aria-describedby="basic-addon2"
                               onChange={this.changePromo}/>
                    </InputGroup>

                    Ваша ссылка: <pre> {this.code ? `${this.url.origin}/lottery/promo/${this.code}` : 'Введите код'}</pre>


                </li>

            </ul>


            <a name={'rules'}>
                <h4>Более подробнее об условиях:</h4>
            </a>
            <LotteryRules data={data}/>
        </div>
    }
}

export default LotteryPromo;