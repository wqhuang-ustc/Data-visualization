import React, { Component } from 'react';
import ReactChartkick, { LineChart } from 'react-chartkick';
import Chart from 'chart.js';
import OpenData from '../../../opendata.json'

ReactChartkick.addAdapter(Chart);

//format opendata into react-chartkick date format
const allSensor1 = [];

for (let i = 0; i < OpenData.length; i += 1){
    allSensor1.push([OpenData[i].date, OpenData[i].sensor1]);
}

class LineCharts extends Component {
    constructor(props){
        super(props);
        this.state = {
            height: '172px',
            DataSensor1: allSensor1
        };
    }

    render(){
        const {height,DataSensor1} = this.state;

        return (
            <div>
                <h1>sensor1 data</h1>
                <LineChart
                  data={DataSensor1}
                  label="value"
                  ytitle="Sensor 1"
                  height={height}
                />
            </div>

        )
    }
}

export default LineCharts;