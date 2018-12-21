import React, { Component } from 'react';
import DateTimePicker from 'react-datetime-picker';
import axios from 'axios';

class Time extends Component {
  state = {
    date1: new Date(),
    date2: new Date(),
    min: "",
    max: "",
  }

  componentDidMount() {
    this.setState({ date: new Date(),
                    min: "",
                    max: ""})
  }
 
  onChange1 = (date) => {
    this.setState({ date1: date})
  }

  onChange2 = (date) => {
    this.setState({ date2: date })
  }

  handleDate() {
    // this.updateMinMax();
    // this.get_query();
  }

  updateMinMax() {
    this.setState({ min: this.state.date1, max: this.state.date2})
  }

  async get_query() {
    let req = "http://localhost:8080/request?start=" + this.state.min + "&end=" + this.state.max;
    await axios.get(req).then((res) => {
      console.log(res);
      this.setState({date1: res.min, date2: res.max})
    })
    .catch(error => this.setState({ isLoadingTable: true }));
  };

 
  render() {
    return (
      <div>
        <DateTimePicker
          onChange={this.onChange1}
          value={this.state.date1}
        />
        <DateTimePicker
          onChange={this.onChange2}
          value={this.state.date2}
        />
      </div>
    );
  }
}

export default Time;