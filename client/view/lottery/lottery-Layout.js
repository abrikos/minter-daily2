import React, {Component} from 'react';
import {inject} from 'mobx-react';
import {Card, CardBody, CardSubtitle, CardText, CardTitle} from "reactstrap";
import 'client/css/App.css';
import 'client/css/minter.css';
import {observable} from "mobx";
import {t} from 'client/Translator'

@inject('store')
class LotteryLayout extends Component {
    @observable balance;

    constructor(props) {
        super(props);
        this.store = props.store;
        this.register = !!props.register || false;
        console.log('zzzzzzzzzzzzzzzz',this.props)

        this.players = props.store.Lottery.getPlayersCount();
        this.balance = props.store.balance;
    }


    onDismiss = () => {
        this.store.alert.isOpen = false;
    };

    render() {


        const alertProps = this.store.alert;
        return <div className={'row'}>
                        <div className={'col-md-8'}>
                            {this.props.view}
                        </div>
                        <div className={'col-md-4'}>


                            <Card>
                                <CardBody>
                                    <CardTitle>{t('Lottery')} </CardTitle>
                                    <CardSubtitle>Приз на {new Date().toLocaleDateString()}: </CardSubtitle>
                                    <strong className={'big5'}>{this.balance}</strong> BIP
                                    <CardText>Участников: {this.players}</CardText>
                                </CardBody>
                            </Card>


                        </div>

                    </div>
    }
}

export default LotteryLayout;
