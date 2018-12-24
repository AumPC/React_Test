import React, { Component } from 'react';
import axios, { post } from 'axios';
import CirclePacking from "./circlePacking";
import Paper from '@material-ui/core/Paper';
import CardContent from '@material-ui/core/CardContent';
import ReactLoading from "react-loading";
require("./dummy.css");

class DomainD3 extends Component {
	state = {
		isLoading: true,
		data1: {
			"name": "domain",
			"children": []
		},
		id: "temp_circle"
	}

	async componentDidMount() {
		await this.setState({ isLoading: true })
		await this.get_data();
		await this.setData();
	};

	async get_data() {
		await axios.get("http://10.3.132.198:8080/domain").then((res) => {
			this.setState({ data: res.data });
		})
			.catch(error => this.setState({ isLoadingTable: true }));
	};

	async setData() {
		this.setState({
			data1: {
				"name": "domain",
				"children": this.state.data
			}, id: "temp_circle",
			isLoading: false
		});
	}

	isLoading() {
		if (this.state.isLoading) {
			return <ReactLoading type="spinningBubbles" color="black" />
		} else {
			return (<CirclePacking data={this.state.data1} id={this.state.id} />)
		}
	};

	render() {
		let isLoading = this.isLoading();
		return (
			<div className="content">
				<Paper>
					<CardContent>
						<h3>Domain Hits</h3>
						<hr />
						<div className="temp_circle">
							{isLoading}
						</div>
					</CardContent>
				</Paper>
			</div>
		);
	}
};

export default DomainD3;