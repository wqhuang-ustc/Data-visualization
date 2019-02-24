import React, { Component } from 'react';
import ReactChartkick, { LineChart } from 'react-chartkick';
import Chart from 'chart.js';
import OpenData from '../../../opendata.json'

ReactChartkick.addAdapter(Chart);

//format opendata into react-chartkick date format
const allSensors = [];

for (let j = 1; j < Object.keys(OpenData[0]).length; j += 1) {
    const sensor = [];
    for (let i = 0; i < OpenData.length; i += 1) {
      const name = Object.keys(OpenData[0])[j];
      sensor.push([OpenData[i].date, OpenData[i][name]]);
    }
    allSensors.push(sensor);
  }

class LineCharts extends Component {
    constructor(props){
        super(props);
        this.state = {
            height: '145px',
            DataSensor1: allSensors[0],
            DataSensor2: allSensors[1],
            DataSensor3: allSensors[2],
            DataSensor4: allSensors[3]
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