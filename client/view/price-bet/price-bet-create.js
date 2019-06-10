import React, {Component} from 'react';
import {inject, observer} from "mobx-react";


@inject('store') @observer
class PriceBetCreate extends Component {


    constructor(props) {
        super(props)
        this.data = this.props.store.config;
    }


    render() {

        return <div>

            Price Bet Create
        </div>
    }
}

export default PriceBetCreate;
