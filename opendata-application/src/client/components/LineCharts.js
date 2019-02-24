import React, { Component } from 'react';
import ReactChartkick, { LineChart } from 'react-chartkick';
import Chart from 'chart.js';
import Button from '@material-ui/core/Button';
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

const daySensors = [];
let dayAvailable = 1;
if (OpenData.length > 23) {
  for (let n = 2; n < Object.keys(OpenData[0]).length; n += 1) {
    const sensor = [];
    for (let i = OpenData.length - 25; i < OpenData.length; i += 1) {
      const name = Object.keys(OpenData[0])[n];
      sensor.push([OpenData[i].date, OpenData[i][name]]);
    }
    daySensors.push(sensor);
  }
} else {
  dayAvailable = 0;
}

class LineCharts extends Component {
    constructor(props){
        super(props);
        this.state = {
            height: '145px',
            all_active: 1,
            recent_active: 0,
            multiview: dayAvailable,
            DataSensor1: allSensors[0],
            DataSensor2: allSensors[1],
            DataSensor3: allSensors[2],
            DataSensor4: allSensors[3]
        };
    }

    handleClickerAll = () => {
        this.setState({
            all_active: 1,
            recent_active: 0,
            DataSensor1: allSensors[0],
            DataSensor2: allSensors[1],
            DataSensor3: allSensors[2],
            DataSensor4: allSensors[3]            
        });
    }

    handleClickRecent = () => {
        this.setState({
          all_active: 0,
          recent_active: 1,
          DataSensor1: daySensors[0],
          DataSensor2: daySensors[1],
          DataSensor3: daySensors[2],
          DataSensor4: daySensors[3],
        });
      }

    render(){
        const {height,DataSensor1, DataSensor2, DataSensor3, DataSensor4} = this.state;

        return (
            <div>

                <div className="charts">
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

                <div className={this.state.multiview ? '' : "hide"}>
                    <span
                        className= {this.state.all_active ? "button_active" : "button_inactive"}
                        onClick={this.handleClickerAll}
                    >
                        <Button variant="contained" color="primary">All Time Retrieved</Button>
                    </span>
                    <span
                        className= {this.state.recent_active ? "button_active" : "button_inactive"}
                        onClick={this.handleClickRecent}
                    >
                        <Button variant="contained" color="primary">Recent 24 Hours</Button>
                    </span>
                </div>

        </div>

        );
    }
}

export default LineCharts;