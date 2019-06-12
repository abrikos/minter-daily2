import React from 'react';
import {Input, InputGroup} from "reactstrap/src";
export default function(config){
    return <div>
        <h1>Ежедневная лотерея!</h1>
        <ul className={'big-line-spacing'}>

            <li>Для участия отправьте <strong className={'big2'}>{config.price}</strong>{config.coin} на адрес <strong
                className={'wallet-address'}><a
                href={`https://explorer.minter.network/address/${config.address}`}
                className={'red'}>{config.address}</a></strong>
            </li>
            <li>Используйте мой промо-код и увеличте
                шансы на выигрыш в <strong className={'big2'}>{config.promoChance}</strong> раза <pre
                    className={'wallet-address red'}>{config.parentCode}</pre></li>
            <li>С каждого купленного по этому промо-коду биплета я получу <strong
                className={'big2'}>{config.percent * 100}%</strong> его стоимости
            </li>
            <li>После покупки биплета на Ваш кошелек придет транакция 0 {config.coin} с адреса <strong
                className={'wallet-address'}><a
                href={`https://explorer.minter.network/address/${config.address}`}
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



        <h4>Более подробнее об условиях:</h4>

    </div>
}

