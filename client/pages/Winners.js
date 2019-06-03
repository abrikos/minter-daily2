import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router";
import {action, observable} from "mobx";
import {t} from '../Translator'
import {Input, InputGroup, InputGroupAddon} from "reactstrap";
import {Link} from "react-router-dom";


@withRouter @inject('store') @observer
class Winners extends Component {
    @observable items = [];

    constructor(props) {
        super(props)

        fetch('/winners.json').then(res => res.json())
            .then(json => {
                this.items = json
            });
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
