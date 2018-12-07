import React, { Component } from 'react';
import SimpleBarchart from './simpleBarchart';
import TimeSeriesLineChart from './timeSeriesLineChart';
import ReactLoading from "react-loading";
import axios from 'axios';

class Body extends Component {

	state = {
		isLoadingMethod: false,
		isLoadingReq: false,
		dataMethod: {},
		dataDate: [],
		dataDateTimeSeries: [],
		dataReq: { Egress: [], Ingress: [] },
	};

	async componentDidMount() {
		await this.setState({ isLoadingMethod: true, isLoadingReq: true })
		await this.get_method_stack()
		await this.get_req_count()
	}

	async get_method_stack() {
		await axios.get("http://localhost:8080/home/method").then((res) => {
			// console.log("DataMethod", res.data.methods, res.data.tickss)
			this.setState({ isLoadingMethod: false, dataMethod: res.data.methods, dataDate:res.data.ticks })
		})
		.catch(error => this.setState({ isLoadingMethod: false }));
	}

	async get_req_count() {
		await axios.get("http://localhost:8080/home/request").then((res) => {
			// console.log("DataReq", res.data.requests, res.data.date)
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
				<div className="row">
						<div className="col">
							{barcharts}
						</div>
				</div>
				<div className="row">
					<div className="col">
						{timeSerires}
					</div>
				</div>
			</div>
		);
	};
};

export default Body;