import React, { Component } from 'react';

import Picker from './picker';
import Button from './button';
import Clock from './clock';
import date from './date';

export default class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      active: false,
    }
  }

  renderItems = function() {
    if (this.state.active) {
      return [
        <Clock/>,
        Button('Change Date', 'changeDate', true, () => this.setState({ active: false })),
        date('04/03'),
        <label className="grid__remaining">Remaining until your 15th birthday</label>
      ]
    } else {
      return [
        Button('Generate Clock', 'generate', false, () => this.setState({ active: true })),
        <Picker/>,
      ]
    }
  }.bind(this)

  render() {

    return (
      <div className="grid">
        <h1 className="grid__title">Birthday Countdown</h1>

        <div className="grid__skew-dark-one-box"></div>
        <div className="grid__skew-dark-two"></div>

        <div className="grid__skew-light-one"></div>
        <div className="grid__skew-light-two"></div>
        <div className="grid__skew-light-three-box"></div>

        { this.renderItems() }
      </div>
    );
  }
}
