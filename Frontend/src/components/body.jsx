import React, { Component } from 'react';
import SimpleBarchart from './simpleBarchart';
import TimeSeriesLineChart from './timeSeriesLineChart';
import ReactLoading from "react-loading";
import axios from 'axios';
import { runInThisContext } from 'vm';

class Body extends Component {

	state = {
		isLoadingMethod: false,
		isLoadingReq: false,
		dataMethod: {},
		dataReq: { Egress: [], Ingress: [] },
		tickXBar: [],
		tickXLine: [],
	};

	async componentDidMount() {
		await this.setState({ isLoadingMethod: true, isLoadingReq: true })
		await this.get_method_stack()
		await this.get_req_count()
	}

	async get_method_stack() {
		await axios.get("http://localhost:8080/home/method").then((res) => {
			console.log("DataMethod", res.data.methods, Object.keys(res.data.ticks))
			this.setState({ isLoadingMethod: false, dataMethod: res.data.methods, tickXBar:res.data.ticks })
		})
		.catch(error => this.setState({ isLoadingMethod: false }));
	}

	async get_req_count() {
		await axios.get("http://localhost:8080/home/request").then((res) => {
			console.log("DataReq", res.data.requests, res.data.date)
			this.setState({ isLoadingReq: false, dataReq: res.data.requests, tickXLine: res.data.date })
		})
		.catch(error => this.setState({ isLoadingMethod: false }));
	}

	render() {
		if (this.state.isLoadingMethod || this.state.isLoadingReq) {
			return <ReactLoading type="spinningBubbles" color="black"/>;
		}

		return (
			<div className='body-container'>
				{/* <SimpleBarchart
					title={'# of requests by time'}
					dataGet={this.state.dataGet}
					dataPost={this.state.dataPost}
					tickXValues={this.state.tickXBar}
					tickYValues=[]
				/>
				<TimeSeriesLineChart 
					title={'# of Ingress&Egress by time'}
					data={this.state.dataTime}
					label_x="Time"
					label_y="Request"
				/> */}
			</div>
		);
	};
};

export default Body;