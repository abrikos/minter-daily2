import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router";
import {observable} from "mobx";
import {t} from '../Translator'


@inject('store')
class Winners extends Component {
    @observable items = [];

    constructor(props) {
        super(props)
        this.items = props.store.Minter.getTransactionsWinner()
        console.log('zzzzzzzzzzzzzz',this.items)
    }

    render() {

        return <table className={'table'}>
            <tbody>
            <tr><th>{t('Promo-code')}</th><th>{t('Date')}</th></tr>
            {this.items.map((p,i)=><tr key={i}><td><a href={`https://explorer.minter.network/address/${p.from}`} target={'_blank'} className={'red big2'}>{p.from}</a></td><td>{p.timestamp}</td></tr>)}
            </tbody>
        </table>;
    }
}

export default Winners;
