import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router";
import {action, observable} from "mobx";
import {t} from '../Translator'
import {Input, InputGroup, InputGroupAddon} from "reactstrap";
import {Link} from "react-router-dom";


@withRouter @inject('store') @observer
class Promos extends Component {
    @observable promos = [];
    url = new URL(window.location.href)

    constructor(props) {
        super(props)

        this.parentCode = this.props.match.params.code
        fetch('/promos.json').then(res => res.json())
            .then(json => {
                console.log('promos', json)
                this.promos = json
            });
    }

    @action changePromo = e => {
        this.code = e.target.value;
    };

    render() {

        return <ul>{this.promos.map(p=><li key={p}><Link to={`/promo/${p}`} className={'red big2'}>{p}</Link></li>)}</ul>;
    }
}

export default Promos;
