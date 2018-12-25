import React, { Component } from 'react';
import Tables from './tables';
import ReactLoading from "react-loading";
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import CardContent from '@material-ui/core/CardContent';
import Time from './time';
import Button from '@material-ui/core/Button';

class EgressIngressPage extends Component {
	state = {
		isLoadingTable: false,
		isLoadingDate: false,
		date1: new Date(),
		date2: new Date(),
		tableData: [{
			username: "sdgs",
			egress: 8148,
			ingress: 15125,
			total: 32525,
			last: 32525
		},
		{
			username: "mvmvmb",
			egress: 23526,
			ingress: 235952,
			total: 245253,
			last: 325235
		}]
	};

	async componentDidMount() {
		await this.setState({ isLoadingTable: true, isLoadingDate: true });
		await this.set_time_state();
		await this.get_table();
	}

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

	onChange1 = (date) => {
		this.setState({ date1: date })
	};

	onChange2 = (date) => {
		this.setState({ date2: date })
	};

	async handleSelect() {
		await this.setState({ isLoadingTable: true });
		await this.get_table();
	};

	async get_table() {
		let i = 0;
		let table = []
		let dummy = {
			username: "",
			ip: "",
			egress: 0,
			ingress: 0,
			total: 0,
			last: ""
		}
		await axios.get("http://10.3.132.198:8080/usertable?startDate=" + this.state.date1.toISOString() + "&endDate=" + this.state.date2.toISOString()).then((res) => {
			// console.log("DataTable", res.data.requests[0], res.data.requests.length)
			for (i; i < res.data.requests.length; i++) {
				dummy['username'] = res.data.requests[i][0]['user']
				dummy['ip'] = res.data.requests[i][0]['ip']
				dummy['egress'] = res.data.requests[i][0]['egress']
				dummy['ingress'] = res.data.requests[i][0]['ingress']
				dummy['total'] = res.data.requests[i][0]['ingress'] + res.data.requests[i][0]['egress']
				dummy['last'] = new Date(res.data.requests[i][0]['time']).toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour12: true, hour: "numeric", minute: "numeric", second: "numeric" })
				table.push(dummy)
				dummy = {
					username: "",
					ip: "",
					egress: 0,
					ingress: 0,
					total: 0,
					last: ""
				}
			}
			this.setState({ isLoadingTable: false, tableData: table })
		})
			.catch(error => this.setState({ isLoadingTable: false }));
	}

	checkIsLoading() {
		if (this.state.isLoadingTable) {
			return <ReactLoading type="spinningBubbles" color="black" />;
		} else {
			return (
				<Tables
					data={this.state.tableData} />
			);
		}
	}

	checkTimePickerIsLoading() {
		if (this.state.isLoadingDate) {
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

	render() {
		let render = this.checkIsLoading();
		let timePicker = this.checkTimePickerIsLoading();
		return (
			<div className="content">
				<Paper>
					<CardContent>
						<h3>Top Most User</h3>
						<hr />
						<CardContent>
							{timePicker}
						</CardContent>
						{render}
					</CardContent>
				</Paper>
			</div>
		);
	};
};

export default EgressIngressPage;