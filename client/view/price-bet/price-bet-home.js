import React, {Component} from 'react';
import {inject, observer} from "mobx-react";


@inject('store') @observer
class PriceBetHome extends Component {


    constructor(props) {
        super(props)
        this.data = this.props.store.config;
    }


    render() {

        return <div>

            Price Bet
        </div>
    }
}

export default PriceBetHome;
