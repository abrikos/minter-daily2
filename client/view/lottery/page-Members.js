import React, {Component} from 'react';
import {inject} from "mobx-react";
import {observable} from "mobx";
import {t} from 'client/Translator'


@inject('store')
class PageMembers extends Component {
    //@observable items = [];

    constructor(props) {
        super(props)
        this.items = props.store.Lottery.getPlayersList()
        this.init()
    }

    async init(){
        //const blocks = await this.props.store.Lottery.getLastBlock();
        //console.log('zzzzzzzzzzzzzz',blocks[0].height)
    }
    render() {

        return <div><table className={'table'}>
            <tbody>
            <tr><th>{t('Members')}</th><th>{t('Chance')}*</th><th>{t('Date')}</th></tr>
            {this.items.map((p,i)=><tr key={i}>
                <td><a href={`https://explorer.minter.network/address/${p.from}`} target={'_blank'} className={'red big2'}>{p.from}</a></td>
                <td title={'Количество попаданий в таблицу выбора победителя'}>{p.promoChance}</td>
                <td>{p.timestamp}</td>
            </tr>)}
            </tbody>
        </table>
            <small>* Количество попаданий в таблицу выбора победителя</small>
        </div>
    }
}

export default PageMembers;
