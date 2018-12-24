import React, { Component } from 'react';
import DateTimePicker from 'react-datetime-picker';
import axios from 'axios';


class Time extends Component {
  state = {
    
  };

 
  render() {
    return (
      <span>
        <DateTimePicker
          onChange={this.props.onChange1}
          value={this.props.date1}
        />
        <DateTimePicker
          onChange={this.props.onChange2}
          value={this.props.date2}
        />
      </span>
    );
  }
}

export default Time;