import React, {Component} from 'react';
import Simplearchart from './simpleBarchart';
import TimeSeriesLineChart from './timeSeriesLineChart';

class Body extends Component {
	state = {
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

	render () {
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