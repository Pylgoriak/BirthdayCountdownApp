import React, { Component } from 'react';
import moment from 'moment';

import Picker from './picker';
import Button from './button';
import Clock from './clock';
import birthdate from './date';

export default class App extends Component {

  constructor(props) {
    super(props)

    this.timer = 0;
    this.getBirthDate = 0;

    this.state = {
      active: false,
      startDate: moment(),

      timeRemaining: {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      },

      age: 0,
      birthday: 0,
    }
  }

  handleChange = function(date) {
    console.log('APP JS HANDLE CHANGE: ', date._d)
    clearInterval(this.timer);
    this.setState({
      startDate: date
    });
  }.bind(this)

  handleGenerate = function() {
    var bday = this.state.startDate.toDate();
    var today = new Date();
    var currentMonth = today.getMonth();
    var birthMonth = bday.getMonth();

    const monthDay = this.getBirthdate(bday);
    var timeBetween = today.getTime() - bday.getTime();
    var daysOld = Math.floor(timeBetween / (1000 * 60 * 60 * 24));
    var age = Number((daysOld/365).toFixed(0));

    this.setState({
      age: age + 1,
      active: true,
      birthday: monthDay
    });

    if (birthMonth > currentMonth) {
      bday.setFullYear(today.getFullYear());
    } else if (birthMonth < currentMonth) {
      bday.setFullYear(today.getFullYear() + 1);
    } else if (birthMonth == currentMonth) {
      var currentDay = today.getDate();
      var birthday = bday.getDate();

      if (birthday > currentDay) {
        bday.setFullYear(today.getFullYear());
      }
      if (birthday <= currentDay) {
        bday.setFullYear(today.getFullYear() + 1);
      }
    }

    var countDownDate = bday.getTime();

    this.timer = setInterval(function() {

      var now = moment().toDate().getTime();
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

  getBirthdate = function(date) {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    if (month < 10 && day < 10) {
      return `0${month}/0${day}`;
    } else if (month >= 10 & day >= 10) {
      return `${month}/${day}`;
    } else if (month >= 10 && day < 10) {
      return `${month}/0${day}`;
    } else if (month < 10 && day >= 10) {
      return `0${month}/${day}`;
    } else {
      return '!Error!';
    }
  }.bind(this)

  renderItems = function() {
    if (this.state.active) {
      return [
        <Clock key={0} timeRemaining={this.state.timeRemaining}/>,

        Button(
          'Change Date',
          'changeDate',
          true,
          () => this.setState({ active: false})
        ),

        birthdate(`${ this.state.birthday }`),

        <label className="grid__remaining">
        Remaining until you turn {this.state.age}
        </label>
      ]
    } else {
      return [
        Button(
          'Generate Countdown',
          'generate',
          false,
          () => this.handleGenerate()
        ),

        <Picker 
        key={4}
        startDate={this.state.startDate}
        callback={(date) => this.handleChange(date)}
        />,
      ]
    }
  }.bind(this)

  render() {

    return (
      <div className="grid">
      <div className='Title'>Birthday Countdown</div>

      { this.renderItems() }
      </div>
    );
  }
}
