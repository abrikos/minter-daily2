import React from 'react';
import Highcharts from 'highcharts';
import {
    HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Title, Subtitle, Legend, LineSeries
} from 'react-jsx-highcharts';


const HighChartsCustom = (props) =>

    <div className="app">
        <HighchartsChart>
            <Chart />

            <Title>{props.title}</Title>

            <Subtitle>{props.subTitle}</Subtitle>

            <Legend layout="vertical" align="right" verticalAlign="middle" />

            <XAxis type='datetime'>
                <XAxis.Title>{props.xTitle}</XAxis.Title>

            </XAxis>

            <YAxis>
                <YAxis.Title>{props.yTitle}</YAxis.Title>
                <LineSeries name={props.yTitle} data={props.data} />
            </YAxis>
        </HighchartsChart>
    </div>;


export default withHighcharts(HighChartsCustom, Highcharts);