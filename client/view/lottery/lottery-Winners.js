import React, {Component} from 'react';
import {inject} from "mobx-react";
import {t} from '../../Translator'
import LotteryLayout from "./lottery-Layout";


@inject('store')
class LotteryWinners extends Component {
    constructor(props) {
        super(props)
        this.items = props.store.Lottery.getTransactionsWinner()
    }

    render() {

        const page = <table className={'table'}>
            <tbody>
            <tr><th>{t('Winners')}</th><th>{t('Date')}</th></tr>
            {this.items.map((p,i)=><tr key={i}><td><a href={`https://explorer.minter.network/address/${p.from}`} target={'_blank'} className={'red big2'}>{p.from}</a></td><td>{p.timestamp}</td></tr>)}
            </tbody>
        </table>;
        return <LotteryLayout view={page}/>
    }
}

export default LotteryWinners;
