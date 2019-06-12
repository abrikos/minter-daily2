import React from 'react';

export default function (config) {
    return <div>
        <h1> Daily Lottery! </ h1>
        <ul className={'big-line-spacing'}>

            <li> To participate, send <strong className={'big2'}> {config.price} </ strong> {config.coin} to <strong
                className={'wallet-address'}> <a
                href={`https://explorer.minter.network/address/$ {config.address}`}
                className={'red'}> {config.address} </a> </ strong>
            </ li>
            <li> Use my promo code and increase
                odds of winning <strong className={'big2'}> {config.promoChance} </ strong> times <pre
                    className={'wallet-address red'}> {config.parentCode} </ pre></ li>
            <li> For every biplet purchased using this promo code, I will receive <strong
                className={'big2'}> {config.percent * 100}% </ strong> of its value
            </ li>
            <li> After buying a biplet, a transfer of 0 {config.coin} from the address <strong
                className={'wallet-address'}> <a
                href={`https://explorer.minter.network/address/$ {config.address}`}
                className={'red'}> {config.address} </a> </ strong> where your personal promotional code will be in the
                "Message" field
            </ li>
            <li> You can copy this information and paste your promotional code.</ li>
            <li> Enter your promotional code to get the link


            </ li>

        </ ul>


        <h4> More details on conditions: </ h4>
    </div>
}

