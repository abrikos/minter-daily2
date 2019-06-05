import React, {Component} from 'react';
import {inject} from "mobx-react";
import {observable} from "mobx";
import {t} from '../../Translator'


@inject('store')
class PageWinners extends Component {
    @observable items = [];

    constructor(props) {
        super(props)
        this.items = props.store.Lottery.getTransactionsWinner()
    }

    render() {

        return <table className={'table'}>
            <tbody>
            <tr><th>{t('Winners')}</th><th>{t('Date')}</th></tr>
            {this.items.map((p,i)=><tr key={i}><td><a href={`https://explorer.minter.network/address/${p.from}`} target={'_blank'} className={'red big2'}>{p.from}</a></td><td>{p.timestamp}</td></tr>)}
            </tbody>
        </table>;
    }
}

export default PageWinners;
