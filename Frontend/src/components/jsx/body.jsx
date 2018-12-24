import React, { Component } from 'react';
import SimpleBarchart from './simpleBarchart';
import TimeSeriesLineChart from './timeSeriesLineChart';
import ReactLoading from "react-loading";
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import CardContent from '@material-ui/core/CardContent';
import DateTimePicker from 'react-datetime-picker';

class Body extends Component {

	state = {
		isLoadingMethod: false,
		isLoadingReq: false,
		dataMethod: {},
		dataDate: [],
		dataDateTimeSeries: [],
		dataReq: { Egress: [], Ingress: [] },
		date: '',
		min:'',
		max:''
	};

	async componentDidMount() {
		await this.selectButton()
	}

	async selectButton() {
		await this.setState({ isLoadingMethod: true, isLoadingReq: true })
		await this.get_method_stack()
		await this.get_req_count()
	}

	async get_method_stack() {
		await axios.get("http://localhost:8080/home/method?startDate="+this.state.min+"&endDate="+this.state.max).then((res) => {
			console.log("DataMethod", res.data.methods, res.data.tickss)
			this.setState({ isLoadingMethod: false, dataMethod: res.data.methods, dataDate:res.data.ticks })
		})
		.catch(error => this.setState({ isLoadingMethod: false }));
	}

	async get_req_count() {
		await axios.get("http://localhost:8080/home/request?startDate="+this.state.min+"&endDate="+this.state.max).then((res) => {
			console.log("DataReq", res.data.requests, res.data.date)
			this.setState({ isLoadingReq: false, dataReq: res.data.requests, dataDateTimeSeries: res.data.date })
		})
		.catch(error => this.setState({ isLoadingReq: false }));
	}

	checkBarchartsIsLoading() {
		if (this.state.isLoadingMethod || this.state.isLoadingReq) {
			return <ReactLoading type="spinningBubbles" color="black"/>;
		} else {
			return (
				<div className='body-container'>
				<SimpleBarchart 
					title = "# of requests method by time"
					dataDate = {this.state.dataDate}
					dataMethod = {this.state.dataMethod} />
				</div>
				);
		}
	}

	onChange = date => {
		this.setState({ date })
		console.log(date.toISOString())
		console.log(new Date("2017-04-09T20:00:00.001Z"))
	}

	checkTimeSeriesIsLoading() {
		if (this.state.isLoadingMethod || this.state.isLoadingReq) {
			return <ReactLoading type="spinningBubbles" color="black"/>;
		} else {
			return (
				<div className='body-container'>
				<TimeSeriesLineChart 
					title = "# of requests method by time"
					dataReq = {this.state.dataReq}
					dataDate = {this.state.dataDateTimeSeries} />
				</div>
				);
		}
	}

	render() {
		let barcharts = this.checkBarchartsIsLoading();
		let timeSerires = this.checkTimeSeriesIsLoading();
		
		return (
			<div>
				        <DateTimePicker
          onChange={this.onChange}
          value={this.state.date}
        />
				<Paper>
					<CardContent>
						{barcharts}
					</CardContent>
				</Paper>
				<hr/>
				<Paper>
					<CardContent>
						{timeSerires}
					</CardContent>
				</Paper>
			</div>
		);
	};
};

export default Body;