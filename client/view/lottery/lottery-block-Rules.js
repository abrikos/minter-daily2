import React from 'react';
import {inject} from 'mobx-react';


@inject('store')
class TopMenu extends React.Component {


    render() {
        const config = this.props.store.Lottery.config;
        return (
            <div>
                <ul className={'big-line-spacing'}>
                    <li>Цена ставки (назовем ее <span className={'red'}>"биплет"</span>:) - <span
                        className={'big2'}>{config.price}</span> BIP
                    </li>
                    <li className={'text-info'}>Транзакция суммой менее <strong className={'red'}>{config.price}</strong> BIP
                        считается подарком
                    </li>

                    <li>
                        <h3>Партнерская программа <span className={'big2'}>{config.percent * 100}%</span></h3>
                        С каждого <span className={'red'}>биплета</span> купленного с Вашим промо-кодом Вы получаете <span
                        className={'big2'}>{config.percent * 100}%</span> от уплаченной за него суммы.
                    </li>

                    <li>
                        <span className={'red'}>Биплет</span> купленный по цене более номинала увеличивает шансы на выигрыш.
                    </li>
                    <li>
                        Розыгрыш приза происходит так:
                        <ul>
                            <li>выбираются все валидные транзакции за день и добавляются в список выбора победителя.</li>
                            <li>Транзакции с суммой более цены <span className={'red'}>биплета</span> попадают в литст еще столько раз во сколько их сумма больше номинала</li>
                            <li>Транзакции с промокодами добавляются еще {config.promoChance} раза</li>
                            <li>Из получившегося списка выбирается 1 случайная транзакция и на адрес откуда она пришла отправляется ежедневный приз.</li>
                        </ul>
                    </li>

                    <li>
                        Ежедневный приз формируется как <strong className={'red'}>{config.percentDaily * 100}%</strong> от
                        всех ставок за сутки
                        минус отчисления за ставки по промо-кодам.
                    </li>

                    <li>После того как Вы купили <span className={'red'}>биплет</span> на адрес вашего кошелька придет <strong>транзакция 0 BIP</strong> с
                        Вашим промо-кдом в поле <strong>"Message"</strong>
                    </li>

                    <li>Приглашайте новых участников с помощью Вашего промо-кода и Вы будете получать {config.percent * 100}%
                        с
                        каждого купленного <span className={'red'}>биплета</span> (если в поле <strong>"Message"</strong> указан Ваш промо-код).
                        Партнерские вознаграждения отправляются на тот же адрес куда лотерея отправила промо-код.
                    </li>




                </ul>
            </div>
        );
    }
}

export default TopMenu;