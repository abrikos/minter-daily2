import React, {Component} from 'react';
import {inject, observer} from "mobx-react";


@inject('store') @observer
class PriceBetLayout extends Component {


    constructor(props) {
        super(props)
        this.data = this.props.store.config;
    }


    render() {

        return <div>
            {this.props.view}
        </div>
    }
}

export default PriceBetLayout;
