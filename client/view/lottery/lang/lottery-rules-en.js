import React from 'react';
export default function(config){
    return <div>
        <ul className = {'big-line-spacing'}>
            <li> Bid price (let's call it <span className = {'red'}> "biplet" </ span> :) - <span
                className = {'big2'}> {config.price} </ span> bip
            </ li>
            <li className = {'text-info'}> Transaction with amount less than <strong className = {'red'}> {config.price} </ strong> BIP
                considered a gift
            </ li>

            <li>
                <h3> Affiliate Program <span className = {'big2'}> {config.percent * 100}% </ span> </ h3>
                With each <span className = {'red'}> biplet </ span> purchased with your promotional code, you get <span
                className = {'big2'}> {config.percent * 100}% </ span> of the amount paid for it.
            </ li>

            <li>
                A <span className = {'red'}> Biplet </ span> bought at a price higher than the nominal value increases the chances of winning.
            </ li>
            <li>
                The prize draw goes like this:
                <ul>
                    <li> select all valid transactions for the day and add them to the winner selection list. </ li>
                    <li> Transactions with an amount greater than the price of a <span className = {'red'}> biplet </ span> fall into the list as many more times as their sum is greater than the nominal value </ li>
                    <li> Transactions with promo codes are added another {config.promoChance} times </ li>
                    <li> From the resulting list, 1 random transaction is selected and a daily prize is sent to the address from where it came. </ li>
                </ ul>
            </ li>

            <li>
                Daily prize is formed as <strong className = {'red'}> {config.percentDaily * 100}% </ strong> from
                all rates per day
                minus deductions for promotional code rates.
            </ li>

            <li> After you have bought a <span className = {'red'}> biplet </ span>, <strong> transaction 0 BIP </ strong> comes to your wallet address with
                Your promo-com in the <strong> "Message" </ strong>
            </ li>

            <li> Invite new members using your promo code and you will receive {config.percent * 100}%
                with
                each <span className = {'red'}> biplet </ span> purchased (if your promo code is in the <strong> "Message" </ strong> field).
                Affiliate rewards are sent to the same address where the lottery sent a promotional code.
            </ li>




        </ ul>
    </div>
}

