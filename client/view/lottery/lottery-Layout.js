import React, {Component} from 'react';
import {inject} from 'mobx-react';
import {Card, CardBody, CardSubtitle, CardText, CardTitle} from "reactstrap";
import 'client/css/App.css';
import 'client/css/minter.css';
import {t} from 'client/Translator'

@inject('store')
class LotteryLayout extends Component {

    constructor(props) {
        console.log('LAYOUT')
        super(props);
        this.store = props.store;
        this.register = !!props.register || false;
        this.players = props.store.Lottery.getPlayersCount();
        this.balance = props.store.Lottery.getPrize().toFixed(2);
    }

    render() {

        return <div className={'row'}>
                        <div className={'col-md-8'}>
                            {this.props.view}
                        </div>
                        <div className={'col-md-4'}>


                            <Card>
                                <CardBody>
                                    <CardTitle>{t('Lottery')} </CardTitle>
                                    <CardSubtitle>Приз на {new Date().toLocaleDateString()}: </CardSubtitle>
                                    <strong className={'big5'}>{this.balance}</strong> {this.props.store.coin}
                                    <CardText>Участников: {this.players}</CardText>
                                    <CardText>Минимальная ставка: {this.props.store.Lottery.config.price} {this.props.store.coin} </CardText>
                                </CardBody>
                            </Card>


                        </div>

                    </div>
    }
}

export default LotteryLayout;
