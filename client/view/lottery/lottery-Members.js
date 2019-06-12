import React, {Component} from 'react';
import {inject} from "mobx-react";
import {t} from '../../Translator'
import LotteryLayout from "./lottery-Layout";


@inject('store')
class LotteryMembers extends Component {
    //@observable items = [];

    constructor(props) {
        super(props);
        this.items = props.store.Lottery.getPlayersList();
        this.players = props.store.Lottery.getPlayersCount();
        this.balance = props.store.Lottery.getPrize().toFixed(2);
        this.init()
    }

    async init(){
        //const blocks = await this.props.store.Lottery.getLastBlock();
        //console.log('zzzzzzzzzzzzzz',blocks[0].height)
    }
    render() {

        const page = <div><table className={'table'}>
            <tbody>
            <tr><th>{t('Members')}</th><th>{t('Chance')}*</th><th>{t('Date')}</th></tr>
            {this.items.map((p,i)=><tr key={i}>
                <td><a href={`https://explorer.minter.network/address/${p.from}`} target={'_blank'} className={'red big2'}>{p.from.substr(0,10)}...</a></td>
                <td title={'Количество попаданий в таблицу выбора победителя'}>{p.promoChance}</td>
                <td>{p.timestamp}</td>
            </tr>)}
            </tbody>
        </table>
            <small>* Количество попаданий в таблицу выбора победителя</small>
        </div>

        return <LotteryLayout view={page}/>
    }
}

export default LotteryMembers;
