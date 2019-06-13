import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import PriceBetLayout from "./price-bet-Layout";
import {observable, action} from "mobx";
import {Button, Input, InputGroup, InputGroupAddon, InputGroupText} from "reactstrap";
import HighChartsCustom from "./highcharts";
import DatePicker from "react-datepicker";
import {registerLocale, setDefaultLocale} from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import {t} from "../../Translator";
import moment from "moment";

import ru from 'date-fns/locale/ru';
import Address from "../../Address";
import CopyButton from "../../CopyButton";



registerLocale('ru', ru)


@inject('store') @observer
class PriceBetCreate extends Component {
    @observable bet = {};
    @observable pair;
    @observable errors = {};
    @observable loading;

    constructor(props) {
        super(props);
        this.pairs = this.props.store.PriceBet.config.pairs;
        this.bet.pair = this.pairs[0];
    }

    @action setPair = async e => {
        this.loading = true;
        this.bet.pair = await JSON.parse(e.target.value)
        this.loading = false;
    };

    setDate = date => {
        this.bet.date = moment(date).utc().valueOf()
        if (this.bet.date <= moment().utc().valueOf()) {
            this.errors.date = 'No bet can be made on the past';
        } else {
            delete this.errors.date;
        }

    };

    setPrice = e => {
        this.bet.price = e.target.value;
        if (this.bet.price <= 0) {
            this.errors.price = 'Price must be greater 0';
        } else {
            delete this.errors.price;
        }
    };

    setBet = e => {
        this.bet.value = e.target.value;
        if (this.bet.value <= 0) {
            this.errors.value = 'Bet must be greater 0';
        } else {
            delete this.errors.value;
        }

    };

    inputGroup = (field, text, control) => {

        return <div className={`row mb-3`}>
            <div className={'col-md-3 d-md-flex flex-row-reverse align-items-center'}>{t(text)}</div>
            <div className={'col-md-9'}>

                {control}
                {this.errors[field] &&
                <div className={'text-danger d-flex align-items-center'}>{t(this.errors[field])}</div>}

            </div>

        </div>
    };

    render() {

        const page = <div className={'p-5'}>
            {this.inputGroup('pair', 'Choose pair', <Input type="select" onChange={this.setPair}>
                {this.pairs.map((p, i) => <option key={i} value={JSON.stringify(p)}>{p.from}/{p.to}</option>)}
            </Input>)}

            {this.inputGroup('date', 'Choose date', <DatePicker onChange={this.setDate} className={'form-control'}
                                                                selected={this.bet.date}
                                                                locale={this.props.language}/>)}

            {this.inputGroup('price', 'Choose price', <Input type="number" onChange={this.setPrice}/>)}
            {/*{this.inputGroup('value', 'How much do You bet', <Input type={'number'} onChange={this.setBet}/>)}*/}
e

            {Object.keys(this.errors).length===0 && Object.keys(this.bet).length===3 && <div className={'alert alert-success'}>
            {/*<div className={'alert alert-success'}>*/}
                <ul>
                    <li>{t('Address')}: <Address text={this.props.store.PriceBet.config.address}/></li>
                    <li>{t('Amount')}: {t('Any')} </li>
                    <li>{t('Coin')}: <strong className={'big2'}>{this.props.store.PriceBet.config.coin}</strong> </li>
                    <li>{t('Send the desired number of {{coin}}s and ALWAYS insert this line in the "Message" field', {coin:this.props.store.PriceBet.config.coin})}:

                        <InputGroup>
                            <Input value={JSON.stringify(this.bet)} readOnly={true} onClick={e=>e.target.select()}/>
                            <InputGroupAddon addonType="append">
                                <InputGroupText><CopyButton text={JSON.stringify(this.bet)}/></InputGroupText>
                            </InputGroupAddon>
                        </InputGroup>
                    </li>
                    <li>{t('')}</li>
                    <li>{t('')}</li>
                </ul>


            </div>}

            <hr/>
            {this.loading || <HighChartsCustom pair={this.bet.pair}/>}
        </div>;

        return <PriceBetLayout view={page} noChart/>
    }
}

export default PriceBetCreate;
