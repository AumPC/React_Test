import React, { Component } from 'react';
import SimpleBarchart from './simpleBarchart';
import Time from './time';
import TimeSeriesLineChart from './timeSeriesLineChart';
import ReactLoading from "react-loading";
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';

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
		await this.get_method_stack();
		await this.get_req_count();
		await this.get_query();
		await this.set_time_state();
	};

	componentDidUpdate() {
		this.updateMinMax();
	};

	async set_time_state() {
		this.setState({ date: new Date(),
                    min: this.state.min,
                    max: this.state.max });
	};

	async get_query() {
		let req = "http://localhost:8080/home/request?startDate=" + this.state.min + "&endDate=" + this.state.max;
		await axios.get(req).then((res) => {
			console.log(res);
			this.setState({date1: res.min, date2: res.max})
		})
		.catch(error => console.log(error));
	};

	async get_method_stack() {
		// await axios.get("http://10.3.132.198:8080/home/method").then((res) => {
		await axios.get("http://localhost:8080/home/method").then((res) => {
			// console.log("DataMethod", res.data.methods, res.data.tickss)
			this.setState({ isLoadingMethod: false, dataMethod: res.data.methods, dataDate:res.data.ticks })
		})
		.catch(error => this.setState({ isLoadingMethod: false }));
	};

	async get_req_count() {
		// await axios.get("http://10.3.132.198:8080/home/request").then((res) => {
		await axios.get("http://localhost:8080/home/request").then((res) => {
			// console.log("DataReq", res.data.requests, res.data.date)
			this.setState({ isLoadingReq: false, dataReq: res.data.requests, dataDateTimeSeries: res.data.date })
		})
		.catch(error => this.setState({ isLoadingReq: false }));
	};

	checkBarchartsIsLoading() {
		if (this.state.isLoadingMethod || this.state.isLoadingReq) {
			return <ReactLoading type="spinningBubbles" color="black"/>;
		} else {
				console.log("barchart", this.state.dataReq, this.state.dataDateTimeSeries)
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

	checkTimeSeriesIsLoading() {
		if (this.state.isLoadingMethod || this.state.isLoadingReq) {
			return <ReactLoading type="spinningBubbles" color="black"/>;
		} else {
				console.log("time series", this.state.dataReq, this.state.dataDateTimeSeries)
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
		this.get_query();
	};

	updateMinMax() {
		console.log("min", this.state.min)
		console.log("max", this.state.max)
	};


	render() {
		let barcharts = this.checkBarchartsIsLoading();
		let timeSerires = this.checkTimeSeriesIsLoading();
		
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