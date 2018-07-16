import React, { Component } from 'react';
import moment from 'moment';

import Picker from './picker';
import Button from './button';
import Clock from './clock';
import date from './date';

export default class App extends Component {

  constructor(props) {
    super(props)

    this.timer = 0;

    this.state = {
      active: false,
      startDate: moment(),
      timeRemaining: {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      }
    }
  }

  handleChange = function(date) {
    console.log('APP JS HANDLE CHANGE: ', date._d)
    this.setState({
      startDate: date
    });
  }.bind(this)

  handleGenerate = function() {
    this.setState({ active: true })

    var countDownDate = this.state.startDate.toDate().getTime();

    this.timer = setInterval(function() {
      var now = new Date().getTime();
      var distance = countDownDate - now;

      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 *24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      const time = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

      const timeRemaining = {
        days,
        hours,
        minutes,
        seconds,
      }

      this.setState({ timeRemaining })
      
      if (distance < 0) {
        clearInterval(this.timer);
      }
    }.bind(this), 1000);
  }.bind(this)

  renderItems = function() {
    if (this.state.active) {
      return [
        <Clock timeRemaining={this.state.timeRemaining}/>,
        Button('Change Date', 'changeDate', true, () => this.setState({ active: false })),
        date('04/03'),
        <label className="grid__remaining">Remaining until your 15th birthday</label>
      ]
    } else {
      return [
        Button('Generate Countdown', 'generate', false, () => this.handleGenerate()),
        <Picker startDate={this.state.startDate} callback={(date) => this.handleChange(date)}/>,
      ]
    }
  }.bind(this)

  render() {

    return (
      <div className="grid">
        <h1 className="grid__title">Birthday Countdown</h1>

        <div className="grid__skew-dark-two"></div>

        <div className="grid__skew-light-one"></div>
        <div className="grid__skew-light-two"></div>
        <div className="grid__skew-light-three-box"></div>

        { this.renderItems() }
      </div>
    );
  }
}
