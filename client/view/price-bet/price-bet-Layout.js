import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import HighChartsCustom from './highcharts'
import {observable} from "mobx";

@inject('store') @observer
class PriceBetLayout extends Component {
    @observable data;

    constructor(props){
        super(props);
        const pairs = this.props.store.PriceBet.config.pairs;
        this.pair = pairs[0]
    }

    render() {

        return <div>
            {this.props.view}
            <hr/>
            {this.props.noChart || <HighChartsCustom pair={this.pair}/>}
        </div>

    }
}

export default PriceBetLayout;
