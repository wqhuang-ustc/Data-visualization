import React, { Component } from 'react';
import './app.css';
import OpenData from './opendata.json';

import LineChart from './LineChart.js';


const width = 500, height = 350;

export default class App extends Component {

  render() {
    return (
      <div className='app'>
        <LineChart data={OpenData} width={width} height={height} />
      </div>
    );
  }
}
