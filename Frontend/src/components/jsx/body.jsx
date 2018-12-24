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
		isLoadingMethod: false,
		isLoadingReq: false,
		isLoadingDate: false,
		dataMethod: {},
		dataDate: [],
		dataDateTimeSeries: [],
		dataReq: { Egress: [], Ingress: [] },
	};

	async componentDidMount() {
		await this.setState({ isLoadingMethod: true, isLoadingReq: true, isLoadingDate: true });
		await this.set_time_state();
		await this.get_method_stack();
		await this.get_req_count();
	};

	async set_time_state() {
		await axios.get("http://10.3.132.198:8080/web-anon/time").then((res) => {
			// console.log('res', res, res.data.min, res.data.max)
			this.setState({
				date1: new Date(res.data.min),
				date2: new Date(res.data.max),
				isLoadingDate: false
			});
		})
			.catch(error => console.log(error));
	};

	async get_method_stack() {
		await axios.get("http://10.3.132.198:8080/home/method?startDate=" + this.state.date1.toISOString() + "&endDate=" + this.state.date2.toISOString()).then((res) => {
			// console.log("DataMethod", res.data.methods, res.data.ticks)
			var date = res.data.ticks.map(dateString => new Date(dateString).toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour12: true, hour: "numeric", minute: "numeric", second: "numeric" }))
			this.setState({ isLoadingMethod: false, dataMethod: res.data.methods, dataDate: date })
		})
			.catch(error => this.setState({ isLoadingMethod: false }));
	};

	async get_req_count() {
		await axios.get("http://10.3.132.198:8080/home/request?startDate=" + this.state.date1.toISOString() + "&endDate=" + this.state.date2.toISOString()).then((res) => {
			// console.log("DataReq", res.data.requests, res.data.date)
			var date = res.data.date.map(dateString => new Date(dateString).toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour12: true, hour: "numeric", minute: "numeric", second: "numeric" }))
			this.setState({ isLoadingReq: false, dataReq: res.data.requests, dataDateTimeSeries: date })
		})
			.catch(error => this.setState({ isLoadingReq: false }));
	};

	checkBarchartsIsLoading() {
		if (this.state.isLoadingDate) {
			return <ReactLoading type="spinningBubbles" color="black" />;
		} else {
			// console.log("barchart", this.state.dataReq, this.state.dataDateTimeSeries)
			return (
				<div className='body-container'>
					<SimpleBarchart
						title="# of requests method by time"
						dataDate={this.state.dataDate}
						dataMethod={this.state.dataMethod} />
				</div>
			);
		}
	};

	checkTimePickerIsLoading() {
		if (this.state.isLoadingMethod || this.state.isLoadingReq) {
			return <ReactLoading type="spinningBubbles" color="black" />;
		} else {
			// console.log("barchart", this.state.dataReq, this.state.dataDateTimeSeries)
			return (
				<div className='body-container'>
					<Time onChange1={this.onChange1}
						onChange2={this.onChange2}
						date1={this.state.date1}
						date2={this.state.date2}
					/>
					<Button color="primary" type="button" onClick={(e) => this.handleSelect(e)}>Select</Button>
				</div>
			);
		}
	};

	checkTimeSeriesIsLoading() {
		if (this.state.isLoadingMethod || this.state.isLoadingReq) {
			return <ReactLoading type="spinningBubbles" color="black" />;
		} else {
			// console.log("time series", this.state.dataReq, this.state.dataDateTimeSeries)
			return (
				<div className='body-container'>
					<TimeSeriesLineChart
						title="# of requests method by time"
						dataReq={this.state.dataReq}
						dataDate={this.state.dataDateTimeSeries} />
				</div>
			);
		}
	};

	onChange1 = (date) => {
		this.setState({ date1: date })
	};

	onChange2 = (date) => {
		this.setState({ date2: date })
	};

	async handleSelect() {
		await this.setState({ isLoadingMethod: true, isLoadingReq: true });
		await this.get_method_stack();
		await this.get_req_count();
	};

	render() {
		let barcharts = this.checkBarchartsIsLoading();
		let timeSerires = this.checkTimeSeriesIsLoading();
		let timePicker = this.checkTimePickerIsLoading();
		return (
			<div>
				<CardContent>
					{timePicker}
				</CardContent>
				<Paper>
					<CardContent>
						{barcharts}
					</CardContent>
				</Paper>
				<hr />
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