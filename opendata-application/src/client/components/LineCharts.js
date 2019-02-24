import React, { Component } from 'react';
import ReactChartkick, { LineChart } from 'react-chartkick';
import Chart from 'chart.js';
import OpenData from '../../../opendata.json'

ReactChartkick.addAdapter(Chart);

//format opendata into react-chartkick date format
const allSensor1 = [];
const allSensor2 = [];
const allSensor3 = [];
const allSensor4 = [];

for (let i = 0; i < OpenData.length; i += 1){
    allSensor1.push([OpenData[i].date, OpenData[i].sensor1]);
}

for (let i = 0; i < OpenData.length; i += 1){
    allSensor2.push([OpenData[i].date, OpenData[i].sensor2]);
}

for (let i = 0; i < OpenData.length; i += 1){
    allSensor3.push([OpenData[i].date, OpenData[i].sensor3]);
}

for (let i = 0; i < OpenData.length; i += 1){
    allSensor4.push([OpenData[i].date, OpenData[i].sensor4]);
}

class LineCharts extends Component {
    constructor(props){
        super(props);
        this.state = {
            height: '145px',
            DataSensor1: allSensor1,
            DataSensor2: allSensor2,
            DataSensor3: allSensor3,
            DataSensor4: allSensor4
        };
    }

    render(){
        const {height,DataSensor1, DataSensor2, DataSensor3, DataSensor4} = this.state;

        return (
            <div>
                <h1>Data visualization of 4 sensors</h1>
                <LineChart
                  data={DataSensor1}
                  label="value"
                  ytitle="Sensor 1"
                  height={height}
                />
                <LineChart
                  data={DataSensor2}
                  label="value"
                  ytitle="Sensor 2"
                  height={height}
                />
                <LineChart
                  data={DataSensor3}
                  label="value"
                  ytitle="Sensor 3"
                  height={height}
                />
                <LineChart
                  data={DataSensor4}
                  label="value"
                  ytitle="Sensor 4"
                  height={height}
                />   
            </div>

        )
    }
}

export default LineCharts;