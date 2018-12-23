import React, { Component } from 'react';
import SimpleBarchart from './simpleBarchart';
import Time from './time';
import TimeSeriesLineChart from './timeSeriesLineChart';
import ReactLoading from "react-loading";
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import DateTimePicker from 'react-datetime-picker';

class Body extends Component {

	state = {
		date1: new Date(),
		date2: new Date(),
		min: new Date(),
		max: new Date(),
		isLoadingMethod: false,
		isLoadingReq: false,
		dataMethod: {},
		dataDate: [],
		dataDateTimeSeries: [],
		dataReq: { Egress: [], Ingress: [] },
	};

	async componentDidMount() {
		await this.setState({ isLoadingMethod: true, isLoadingReq: true });
		await this.set_time_state();
		await this.get_method_stack();
		await this.get_req_count();
	};

	componentDidUpdate() {
		this.updateMinMax();
	};

	async set_time_state() {
		// await axios.get("http://10.3.132.198:8080/web-anon/time").then((res) => {
		await axios.get("http://localhost:8080/web-anon/time").then((res) => {
			console.log('res', res, res.data.min, res.data.max)
			this.setState({ min: res.data.min,
							max: res.data.max });
		})
		.catch(error => console.log(error));
	};

	async get_method_stack() {
		// await axios.get("http://10.3.132.198:8080/home/method").then((res) => {
		await axios.get("http://localhost:8080/home/method?startDate="+this.state.min+"&endDate="+this.state.max).then((res) => {
			console.log("DataMethod", this.state.min, res.data.methods, res.data.tickss)
			this.setState({ isLoadingMethod: false, dataMethod: res.data.methods, dataDate:res.data.ticks })
		})
		.catch(error => this.setState({ isLoadingMethod: false }));
	};

	async get_req_count() {
		await axios.get("http://localhost:8080/home/request?startDate="+this.state.min+"&endDate="+this.state.max).then((res) => {
			console.log("DataReq", res.data.requests, res.data.date)
			this.setState({ isLoadingReq: false, dataReq: res.data.requests, dataDateTimeSeries: res.data.date })
		})
		.catch(error => this.setState({ isLoadingReq: false }));
	};

	checkBarchartsIsLoading() {
		if (this.state.isLoadingMethod || this.state.isLoadingReq) {
			return <ReactLoading type="spinningBubbles" color="black"/>;
		} else {
				// console.log("barchart", this.state.dataReq, this.state.dataDateTimeSeries)
			return (
				<div className='body-container'>
				<SimpleBarchart 
					title = "# of requests method by time"
					dataDate = {this.state.dataDate}
					dataMethod = {this.state.dataMethod} />
				</div>
				);
		}
	};

	onChange = date => {
		this.setState({ date })
		console.log(date.toISOString())
		console.log(new Date("2017-04-09T20:00:00.001Z"))
	}

	checkTimeSeriesIsLoading() {
		if (this.state.isLoadingMethod || this.state.isLoadingReq) {
			return <ReactLoading type="spinningBubbles" color="black"/>;
		} else {
				// console.log("time series", this.state.dataReq, this.state.dataDateTimeSeries)
			return (
				<div className='body-container'>
				<TimeSeriesLineChart 
					title = "# of requests method by time"
					dataReq = {this.state.dataReq}
					dataDate = {this.state.dataDateTimeSeries} />
				</div>
				);
		}
	};

	onChange1 = (date) => {
		this.setState({ date1: date, min: date })
	};

	onChange2 = (date) => {
		this.setState({ date2: date, max: date })
	};

	handleSelect() {
		console.log('clicked');
		this.get_method_stack();
		this.get_req_count();
	};

	updateMinMax() {
		console.log("min", this.state.min)
		console.log("max", this.state.max)
	};


	render() {
		let barcharts = this.checkBarchartsIsLoading();
		let timeSerires = this.checkTimeSeriesIsLoading();
		
		console.log("change")
		return (
			<div>
				<CardContent>
					<Time 	onChange1={this.onChange1}
							onChange2={this.onChange2}
							date1={this.state.date1}
							date2={this.state.date2}
							min={this.state.min}
							max={this.state.max} />
        			<Button color="primary" type="button" onClick={(e) => this.handleSelect(e)}>Select</Button>
				</CardContent>
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