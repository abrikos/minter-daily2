import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import PriceBetLayout from "./price-bet-Layout";


@inject('store') @observer
class PriceBetCreate extends Component {


    constructor(props) {
        super(props)
        this.data = this.props.store.config;
    }


    render() {

        const page = <div>

            Price Bet Create
        </div>;
        return <PriceBetLayout view={page}/>
    }
}

export default PriceBetCreate;
