import React, {Component} from 'react';
import SimpleBarchart from './simpleBarchart';
import TimeSeriesLineChart from './timeSeriesLineChart';

class Body extends Component {
	state = {
		dataGet: [
		{
			time: 1,
			amount: 3000
		},
		{
			time: 2,
			amount: 2300
		},
		{
			time: 3,
			amount: 2000
		},
		{
			time: 4,
			amount: 2900
		}],
		dataPost: [
		{
			time: 1,
			amount: 3000
		},
		{
			time: 2,
			amount: 2500
		},
		{
			time: 3,
			amount: 3300
		},
		{
			time: 4,
			amount: 2900
		}],
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
		tickXValues: ['1-NOV', '2-NOV', '3-NOV', '4-NOV'],
		tickYValues: [],
		label_x: 'Time',
		label_y: 'Requests'
	};

	render () {
		return (
			<div className='body-container'>
				<SimpleBarchart
					title={'# of requests by time'}
					dataGet={this.state.dataGet}
					dataPost={this.state.dataPost}
					tickXValues={this.state.tickXValues}
					tickYValues={this.state.tickYValues}
				/>
				<TimeSeriesLineChart 
					title={'# of Ingress&Egress by time'}
					data={this.state.dataTime}
					label_x={this.state.label_x}
					label_y={this.state.label_y}
				/>
			</div>
			);
	};
};

export default Body;