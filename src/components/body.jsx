import React, {Component} from 'react';
import Simplearchart from './simpleBarchart';
import TimeSeriesLineChart from './timeSeriesLineChart';
import ReactLoading from "react-loading";
import axios from 'axios';

class Body extends Component {
	state = {
		hits: [],
		isLoading: false,
		data: [
			{method: 'POST', amount: 2500},
			{method: 'GET', amount: 3000}
		],
		dataTime: [
			{
				data: [
				{x: 1, y: 300},
				{x: 2, y: 250},
				{x: 3, y: 180},
				{x: 4, y: 200}]
			},
			{
				data: [
				{x: 1, y: 240},
				{x: 2, y: 380},
				{x: 3, y: 300},
				{x: 4, y: 340}]
			}
		],
		tickValues: [1, 2],
		label_x: 'Time',
		label_y: 'Requests'
	};

	constructor(props) {
		super(props);
	
		this.state = {
			hits: [],
			isLoading: false,
			error: null,
			data: [
				{method: 'POST', amount: 2500},
				{method: 'GET', amount: 3000}
			],
			dataTime: [
				{
					data: [
					{x: 1, y: 300},
					{x: 2, y: 250},
					{x: 3, y: 180},
					{x: 4, y: 200}]
				},
				{
					data: [
					{x: 1, y: 240},
					{x: 2, y: 380},
					{x: 3, y: 300},
					{x: 4, y: 340}]
				}
			],
			tickValues: [1, 2],
			label_x: 'Time',
			label_y: 'Requests'
		};
	  }

	componentDidMount() {
		this.setState({ isLoading: true });

		axios.get("http://10.3.132.198:9200/web-anon/_search", {
			params: {
				size: 10,
			}})
		.then((res) => {
			console.log(res);
			this.setState({ isLoading: false });
		  })
		.catch(error => this.setState({
		  isLoading: false
		}));
	  }	

	render () {
		
		if (this.state.isLoading) {
			return <ReactLoading type="spinningBubbles" color="black"/>;
		}

		return (
			<div className='body-container'>
				<Simplearchart 
					data={this.state.data}
					tickValues={this.state.tickValues}
				/>
				<TimeSeriesLineChart 
					data={this.state.dataTime}
					label_x={this.state.label_x}
					label_y={this.state.label_y}
				/>
			</div>
			);
	};
};

export default Body;