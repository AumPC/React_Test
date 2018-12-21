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
		isLoadingMethod: false,
		isLoadingReq: false,
		dataMethod: {},
		dataDate: [],
		dataDateTimeSeries: [],
		dataReq: { Egress: [], Ingress: [] },
		dummy: false,
		dataDummyMe: {"methods":{"GET":[2204,2481,2250,2222,2761,4072,2275,1967,2113,1944],"HEAD":[74,58,62,62,59,93,52,36,41,16],"POST":[152,173,155,112,132,227,158,160,139,145],"HTTPS":[527,583,501,372,428,682,396,403,410,427],"DELETE":[0,0,0,0,0,0,0,0,0,0],"PUT":[1,0,0,0,0,0,0,0,0,0],"CONNECT":[0,0,0,0,0,0,0,0,0,0],"OPTIONS":[0,0,0,0,0,0,0,0,0,0],"TRACE":[0,0,0,0,0,0,0,0,0,0],"PATCH":[0,0,0,0,0,0,0,0,0,0]},"ticks":["2017-04-09T20:05:00.000Z","2017-04-09T20:05:30.000Z","2017-04-09T20:06:00.000Z","2017-04-09T20:06:30.000Z","2017-04-09T20:07:00.000Z","2017-04-09T20:07:30.000Z","2017-04-09T20:08:00.000Z","2017-04-09T20:08:30.000Z","2017-04-09T20:09:00.000Z","2017-04-09T20:09:30.000Z"]},
		dataDummyReq: {"requests":{"Egress":[2958,3295,2968,2768,3380,5074,2881,2566,2703,2532],"Ingress":[2958,3295,2968,2768,3380,5074,2881,2566,2703,2532]},"date":["2017-04-09T20:05:00.000Z","2017-04-09T20:05:30.000Z","2017-04-09T20:06:00.000Z","2017-04-09T20:06:30.000Z","2017-04-09T20:07:00.000Z","2017-04-09T20:07:30.000Z","2017-04-09T20:08:00.000Z","2017-04-09T20:08:30.000Z","2017-04-09T20:09:00.000Z","2017-04-09T20:09:30.000Z"]}
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
			this.setState({ isLoadingReq: false, dataReq: res.data.requests, dataDateTimeSeries: res.data.date })
		})
		.catch(error => this.setState({ isLoadingReq: false }));
	}

	checkBarchartsIsLoading() {
		if (this.state.isLoadingMethod || this.state.isLoadingReq) {
			return <ReactLoading type="spinningBubbles" color="black"/>;
		} else if (this.state.dummy) {
			return(
			<div className='body-container'>
				<SimpleBarchart 
					title = "# of requests method by time"
					dataDate = {this.state.dataDummyMe['ticks']}
					dataMethod = {this.state.dataDummyMe['methods']} />
				</div>
			);
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
		} else if (this.state.dummy) {
			return(
				<div className='body-container'>
				<TimeSeriesLineChart 
					title = "# of requests method by time"
					dataReq = {this.state.dataDummyReq['requests']}
					dataDate = {this.state.dataDummyReq['date']} />
				</div>
				);
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
	};

	handleDummy(e) {
		this.click()
	}

	click = () => {
		this.setState({dummy: true});

	}

	render() {
		let barcharts = this.checkBarchartsIsLoading();
		let timeSerires = this.checkTimeSeriesIsLoading();
		

		console.log(this.state.dataReq)
		console.log(this.state.dataDateTimeSeries)
		console.log(this.state.dataDummyReq['requests'])
		return (
			<div>
				<CardContent>
					<Time />
        			<Button color="primary" type="button" onClick={(e) => this.handleDummy(e)}>Select</Button>
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