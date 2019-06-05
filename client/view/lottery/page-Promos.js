import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router";
import {action, observable} from "mobx";
import {Link} from "react-router-dom";
import {t} from "../../Translator";


@withRouter @inject('store') @observer
class PagePromos extends Component {
    @observable promos = [];


    constructor(props) {
        super(props);
        this.promos = props.store.Lottery.getTransactionsSentCodes()
    }


    render() {

        return <table>
            <tbody>
            <tr><th>{t('Code')}</th></tr>
            {this.promos.map((p,i) => <tr key={i}>
                <td><Link to={`/promo/${p.message}`} className={'red big2'}>{p.message}</Link></td>

        </tr>)}
            </tbody></table>;
    }
}

export default PagePromos;
