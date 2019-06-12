import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import PriceBetLayout from "./price-bet-Layout";
import {observable, action} from "mobx";
import {Input} from "reactstrap";
import HighChartsCustom from "./highcharts";


@inject('store') @observer
class PriceBetCreate extends Component {
    @observable pair;
    @observable loading;

    constructor(props) {
        super(props);
        this.pairs = this.props.store.PriceBet.config.pairs;
        this.pair=this.pairs[0];
    }

    @action selectPair = async e=>{
        this.loading = true;
        this.pair = await JSON.parse(e.target.value)
        this.loading = false;
    };

    render() {

        const page = <div className={'p-5'}>
            <Input type="select" name="select" onChange={this.selectPair}>
                {this.pairs.map((p,i)=><option key={i} value={JSON.stringify(p)}>{p.from}/{p.to}</option>)}
            </Input>
            {this.loading || <HighChartsCustom pair={this.pair}/>}
        </div>;

        return <PriceBetLayout view={page} noChart/>
    }
}

export default PriceBetCreate;
