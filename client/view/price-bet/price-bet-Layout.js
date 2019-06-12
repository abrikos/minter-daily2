import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import HighChartsCustom from './highcharts'
import {observable} from "mobx";
import PriceBet from "../../lib/PriceBet";

@inject('store') @observer
class PriceBetLayout extends Component {
    @observable data;

    constructor(props) {
        super(props)
        this.init()
    }

    init = async ()=>{
        const data = await  PriceBet.cryptocompare('histohour', 'BTC','USD',0);
        console.log(data)
        this.data = data.map(d=>[d.time,d.open*1]).reverse()
    };

    render() {

        return <div>
            {this.props.view}
            <HighChartsCustom xTitle={'Date'} yTitle={'BTC/USD'} data={this.data}/>
        </div>
    }
}

export default PriceBetLayout;
