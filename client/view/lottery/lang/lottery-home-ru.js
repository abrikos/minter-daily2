import React from "react";
import Address from "../../../Address";

export default function (data) {
    return <div>
        <ul className={'big-line-spacing'}>
            <li>
                <h1>Отправьте <strong className={'big2'}>{data.price}</strong> {data.coin} на адрес:</h1>
                <Address text={data.address}/>

                {data.parentCode &&
                <li>И в поле <strong>"Message"</strong> укажите мой промокод: <strong className={'big2 red'}>{data.parentCode}</strong></li>}
            </li>
            <li>
                Вы таки зададите мне вопрос: <strong className={'big2'}>"Зачем?"</strong>
            </li>

            <li>
                А затем, <strong className={'big2'}>чтобы</strong> я Вам, при всем своем уважении, обеспечил
                возможность <strong className={'big2'}>получить&nbsp;{data.coin}</strong> поболее, а в
                хороший день и гораздо <strong className={'big2'}>поболее.</strong>
            </li>

            <li>
                Удивлюсь если Вы опять же не спросите: "<strong className={'big2'}>За что</strong> такие роскошные
                подарки<strong className={'big2'}>?</strong>"
            </li>

            <li>
                Со всем удовольствием своего сердца отвечу и на этот вопрос: "Я нахожусь в полной уверенности
                что Вами будут приглашены (будьте уверены <strong className={'big2'}>За</strong> хорошие вещи, об
                этом <a href="#rules">ниже</a>) в
                нашу весёлую
                кампанию несколько новых не халявщиков, но <strong className={'big2'}>партнеров!</strong>
            </li>

            <li>
                И (чтобы не возникло у нас вавилонской путаницы кто от чьего дяди пришел и кому сколько насыпать)
                лично Вам, на адрес лично Вашего кошелька будет отправлен
                лично Ваш уникальный промо-код. С помощью коего Вы сможете пополнять наши ряды любителей гешефта.
            </li>

            <li>
                Я полностью поглощен уверенностью, что Вы человек понимающий и уже имеете целью поинтересоваться: <strong className={'big2'}>Это
                пирамида?</strong>
                А я, положа руку на всю свою жизненную грусть, отвечу Вам честно: <strong className={'big2'}>Да!
                Но...</strong>
                Но не только! Это <strong className={'big2'}>еще и лотерея!</strong>
            </li>

            <li>
                Каждый, неуловимый ни взглядом, ни слухом, момент, когда начинаются вчера и завтра, или иначе
                говоря <strong className={'big2'}>Ежедневно</strong> будет формироваться и отправляться <strong
                className={'big2'}>приз</strong> одному из случайных счастливчиков прожитого дня, кто решился отдать
                себя в руки Фортуны.
                А стать баловнем ежедневной судьбы и получить <strong
                className={'big2'}>{data.percentDaily * 100}% дневного банка</strong>Вам помогут промо-коды, и это тоже хорошая вещь, о которой подробнее <a
                href="#rules">ниже</a>.
            </li>
        </ul>


        <a name={'rules'}>
            <h4>Все что находится <span className={'red'}>ниже</span> можно называть "Правила и условия лотерии"</h4>
        </a>
    </div>
}