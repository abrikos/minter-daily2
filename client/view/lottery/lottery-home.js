import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import lotteryRulesRu from "./lang/lottery-rules-ru";
import lotteryRulesEn from "./lang/lottery-rules-en";
import LotteryLayout from "./lottery-Layout";
import lotteryHomeEn from "./lang/lottery-home-en"
import lotteryHomeRu from "./lang/lottery-home-ru"

@inject('store') @observer
class LotteryHome extends Component {


    constructor(props) {
        super(props)
        this.data = this.props.store.Lottery.config;
    }


    render() {
        let page;
        switch (this.props.language) {
            case 'ru':
                page = <div>{lotteryHomeRu(this.props.store.Lottery.config)}{lotteryRulesRu(this.props.store.Lottery.config)}</div>;

                break;
            case 'en':
                page = <div>{lotteryHomeEn(this.props.store.Lottery.config)}{lotteryRulesEn(this.props.store.Lottery.config)}</div>;
                break;
        }

        return <LotteryLayout view={page}/>
    }
}

export default LotteryHome;
