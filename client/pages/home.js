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


            <ul className={'big-line-spacing'}>
                <li>
                    <h1>Отправьте <strong className={'big2'}>{data.price}</strong> BIP на адрес:</h1>
                    <strong
                        className={'wallet-address'}><a
                        href={`https://explorer.minter.network/address/${this.address}`}
                        className={'red'}>{this.address}</a></strong>
                </li>
                <li>
                    Вы таки зададите мне вопрос: <strong className={'big2'}>"Зачем?"</strong>
                </li>

                <li>
                    А затем, <strong className={'big2'}>чтобы</strong> я Вам, при всем своем уважении, обеспечил
                    возможность <strong className={'big2'}>получить&nbsp;Бипов</strong> поболее, а в
                    хороший день и гораздо <strong className={'big2'}>поболее.</strong>
                </li>

                <li>
                    Удивлюсь если Вы опять же не спросите: "<strong className={'big2'}>За что</strong> такие роскошные
                    подарки<strong className={'big2'}>?</strong>"
                </li>

                <li>
                    Со всем удовольствием своего сердца отвечу и на этот вопрос: "Я нахожусь в полной уверенности
                    что Вами будут приглашены (будьте уверены <strong className={'big2'}>За</strong> хорошие вещи, об
                    этом <a href="#rules">ниже</a>) в
                    нашу весёлую
                    кампанию несколько новых не халявщиков, но <strong className={'big2'}>партнеров!</strong>
                </li>

                <li>
                    И (чтобы не возникло у нас вавилонской путаницы кто от чьего дяди пришел и кому сколько насыпать)
                    лично Вам, на адрес лично Вашего кошелька будет отправлен
                    лично Ваш уникальный промо-код. С помощью коего Вы сможете пополнять наши ряды любителей гешефта.
                </li>

                <li>
                    Вы, я уверен, человек понимающий и сразу же захотите вновь вопрошать: <strong className={'big2'}>Это
                    пирамида?</strong>
                    А я, положа руку на всю свою жизненную грусть, отвечу Вам честно: <strong className={'big2'}>Да!
                    Но...</strong>
                    Но не только! Это <strong className={'big2'}>еще и лотерея!</strong>
                </li>

                <li>
                    Каждый, неуловимый ни взглядом, ни слухом, момент, когда начинаются вчера и завтра, или иначе
                    говоря <strong className={'big2'}>Ежедневно</strong> будет высчитываться и отправляться <strong
                    className={'big2'}>приз</strong> одному из случайных счастливчиков прожитого дня, кто решился отдать
                    себя в руки Фортуны.
                    Стать баловнем ежедневной судьбы помогут промо-коды, и это тоже хорошая вещь, о которой подробнее <a
                    href="#rules">ниже</a>.
                </li>
            </ul>


            <a name={'rules'}/>
            <h4>Все что находится <span className={'red'}>ниже</span> можно называть "Правила и условия лотерии"</h4>
            <ul>
                <li>
                    <h3>Партнерская программа <span className={'big2'}>{data.percent * 100}%</span></h3>
                    Начнем с самого хорошего: С каждой ставки сделанной с Вашим промо-кодом Вы получаете <span
                    className={'big2'}>{data.percent * 100}%</span> от суммы ставки.
                </li>

                <li>
                    Ставки в которых был использован валидный <span className={'big2'}>промо-код</span> попадают в лист
                    претендентов на ежедневный приз <span className={'big2'}>{data.promoUp} раза</span>.
                </li>

                <li>
                    Ежедневный приз формируется так: <strong className={'red'}>{data.percentDaily * 100}%</strong> от
                    всех ставок за сутки
                    минус отчисления за промо-коды.
                </li>

                <li>Цена ставки (так и хочется ее назвать <span className={'red'}>"биплет"</span>:) - <span
                    className={'big2'}>{data.price}</span> BIP
                </li>
                <li className={'text-info'}>Транзакция суммой менее <strong className={'red'}>{data.price}</strong> BIP
                    считается подарком
                </li>
                <li>После того как Вы сделали ставку на адрес вашего кошелька придет <strong>транзакция 0 BIP</strong> с
                    Вашим промо-кдом в поле <strong>"Message"</strong>
                </li>

                <li>Приглашайте новых участников с помощью Вашего промо-кода и Вы будете получать {data.percent * 100}%
                    с
                    каждой ставки где использован этот промо-код. Партнерские вознаграждения отправляются на тот же
                    адрес куда пришел промо-код.
                </li>

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
