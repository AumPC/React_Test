import React, { Component } from 'react';
import SimpleBarchart from './simpleBarchart';
import TimeSeriesLineChart from './timeSeriesLineChart';
import ReactLoading from "react-loading";
import axios from 'axios';

class Body extends Component {

	state = {
		isLoadingMethod: false,
		isLoadingEgress: false,
		isLoadingIngress: false,
		dataMethod: {"GET": [], "HEAD": [], "POST": [], "POST": [], "DELETE": [], "CONNECT": [], "OPTIONS": [], "TRACE": [], "PATCH": []},
		dataLegend: ["GET", "HEAD", "POST", "PUT", "DELETE", "CONNECT", "OPTIONS", "TRACE", "PATCH"],
		dataDate: [],
		dataDateTimeSeries: [],
		dataReq: { Egress: [], Ingress: [] },
		dataEgress: {},
		dataIngress: {}
	};

	async componentDidMount() {
		await this.setState({ isLoadingMethod: true, isLoadingReq: true })
		await this.get_method_stack()
		await this.get_req_count()
	}

	async get_method_stack() {
		await axios.get("http://localhost:8080/home/method").then((res) => {
			console.log("DataMethod", res.data.methods, res.data.tickss)
			this.setState({ isLoadingMethod: false, dataMethod: res.data.methods, dataDate:res.data.ticks })
		})
		.catch(error => this.setState({ isLoadingMethod: false }));
	}

	async get_req_count() {
		await axios.get("http://localhost:8080/home/request").then((res) => {
			console.log("DataReq", res.data.requests, res.data.date)
			this.setState({ isLoadingReq: false, dataReq: res.data.requests, dataDate: res.data.date })
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
					dataLegend = {this.state.dataLegend}
					dataDate = {this.state.dataDate}
					dataMethod = {this.state.dataMethod} />
				</div>
				);
		}
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
					dataDate = {this.state.dataDateTimeSeries}
					dataEgress = {this.state.dataEgress}
					dataIngress = {this.state.dataIngress} />
				</div>
				);
		}
	}

	render() {
		let barcharts = this.checkBarchartsIsLoading();
		let timeSerires = this.checkTimeSeriesIsLoading();
		
		return (
			<div className="body-container">
				{barcharts}
				{timeSerires}
			</div>
		);
	};
};

export default Body;