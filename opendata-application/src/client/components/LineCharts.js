import React, { Component } from 'react';
import ReactChartkick, { LineChart } from 'react-chartkick';
import Chart from 'chart.js';
import Button from '@material-ui/core/Button';

ReactChartkick.addAdapter(Chart);

class LineCharts extends Component {
    constructor(props){
        super(props);
        this.state = {
            height: '145px'
        };
    }

    componentDidMount() {
        this.initState();
        // update frontend data every 30 minutes
        this.interval = setInterval(() => this.updateData(), 1800000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    // Display all init data, hide button if data is less than 24 hours
    initState = () => {
        fetch('/api/updateData')
          .then(res => res.json())
          .then(res => this.setState({
            all_active: 1,
            recent_active: 0,
            multiview: 1,
            DataSensor1: res[0],
            DataSensor2: res[1],
            DataSensor3: res[2],
            DataSensor4: res[3]
          }));
        console.log('Data init '.concat((new Date()).toISOString().split('.')[0].replace('T', ',')));
    
        fetch('/api/updateData')
          .then(res => res.json())
          .then((res) => {
            if (res[0].length < 25) {
              this.setState({
                multiview: 0,
              });
            }
          });
      }  

  // update data,  "all_active" save state of whether in the 24-hour view, 
  updateData = () => {
    fetch('/api/updateData')
      .then(res => res.json())
      .then((res) => {
        if (this.state.all_active === 1) {
          this.setState({
            DataSensor1: res[0],
            DataSensor2: res[1],
            DataSensor3: res[2],
            DataSensor4: res[3]
          });
        } else {
          this.setState({
            DataSensor1: res[0].slice(Math.max(res[0].length - 24, 1)),
            DataSensor2: res[1].slice(Math.max(res[1].length - 24, 1)),
            DataSensor3: res[2].slice(Math.max(res[2].length - 24, 1)),
            DataSensor4: res[3].slice(Math.max(res[3].length - 24, 1))
          });
        }
      });
    console.log('Data updated '.concat((new Date()).toISOString().split('.')[0].replace('T', ',')));
  }

    handleClickerAll = () => {
        fetch('/api/updateData')
        .then(res => res.json())
        .then(res => this.setState({
          all_active: 1,
          recent_active: 0,
          DataSensor1: res[0],
          DataSensor2: res[1],
          DataSensor3: res[2],
          DataSensor4: res[3]
        }));
    }

    handleClickRecent = () => {
        fetch('/api/updateData')
        .then(res => res.json())
        .then(res => this.setState({
          all_active: 0,
          recent_active: 1,
          DataSensor1: res[0].slice(Math.max(res[0].length - 24, 1)),
          DataSensor2: res[1].slice(Math.max(res[1].length - 24, 1)),
          DataSensor3: res[2].slice(Math.max(res[2].length - 24, 1)),
          DataSensor4: res[3].slice(Math.max(res[3].length - 24, 1))
        }));
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
                        <Button size="small" variant="contained" color="primary">All Data Retrieved</Button>
                    </span>
                    <span
                        className= {this.state.recent_active ? "button_active" : "button_inactive"}
                        onClick={this.handleClickRecent}
                    >
                        <Button size="small" variant="contained" color="primary">Recent 24 Hours</Button>
                    </span>
                </div>

        </div>

        );
    }
}

export default LineCharts;