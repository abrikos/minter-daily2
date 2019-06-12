import React, {Component} from 'react';
import {observer} from "mobx-react";
import {observable} from "mobx";
import CopyButton from "./CopyButton";

const mt = require('client/lib/MinterTransactions');
const MinterTransactions = mt.default;


@observer
class Address extends Component {
    @observable showPopOver = false;

    constructor(props) {
        super(props)
        this.linkToAddress = MinterTransactions.config[MinterTransactions.config.net].explorerUrl + '/address/' + this.props.text;

    }


    render() {

        return <span>
            <a href={this.linkToAddress} className={'big2'} target={'_blank'}><strong>{this.props.text}</strong></a>&nbsp;
            <CopyButton text={this.props.text} size={'2x'}/>
        </span>
    }
}

export default Address;
