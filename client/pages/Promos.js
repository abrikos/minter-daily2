import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router";
import {action, observable} from "mobx";
import {Link} from "react-router-dom";


@withRouter @inject('store') @observer
class Promos extends Component {
    @observable promos = [];


    constructor(props) {
        super(props);
        this.promos = props.store.Minter.getValidCodes()
    }

    @action changePromo = e => {
        this.code = e.target.value;
    };

    render() {

        return <ul>{this.promos.map(p => <li key={p}><Link to={`/promo/${p}`} className={'red big2'}>{p}</Link>
        </li>)}</ul>;
    }
}

export default Promos;
