import React, {Component} from 'react';
import {VictoryChart,
		VictoryLine,
		VictoryBar,
		VictoryAxis,
		VictoryTheme,
		VictoryLegend} from 'victory';

class TimeSeriesLineChart extends Component {
	state = {
		
	};

	render () {

		return (
			<VictoryChart
				minDomain={{ x:0.5, y: 0 }}
				maxDomain={{ x:4, y: 500 }}
				animate={{
					duration: 1000,
					onLoad: {duration: 1000}
				}} 
				theme={VictoryTheme.material} >
				<VictoryAxis
					label={this.props.label_x} />
				<VictoryAxis 
					dependentAxis 
					label={this.props.label_y} />
				<VictoryLegend
					x={100}
					y={0}
					title='Legend'
					centerTitle
					orientation='horizontal'
					style={{
						border: { stroke: 'black' },
						title: {fontSize: 20}
					}}
					gutter={20}
					data={[
						{name: 'Ingress', symbol: { fill: '#993955' }},
						{name: 'Egress', symbol: { fill: '#A3C3D9' }}
						]}
				/>
				<VictoryLine
					data={this.props.data[0].data}
					animate={{
						duration: 1000,
						onLoad: {duration: 750}
					}}
					labels={(d) => d.y}
					style={{
						data: {stroke: "#993955", opacity: 0.7},
						labels: {fill: "#993955"}
					}} />
				<VictoryLine
					data={this.props.data[1].data}
					animate={{
						duration: 1000,
						onLoad: {duration: 1000}
					}}
					labels={(d) => d.y}
					style={{
						data: {stroke: "#A3C3D9", opacity: 0.7},
						labels: {fill: "#A3C3D9"}
					}}
				/>	
			</VictoryChart>
			);
	};
};

export default TimeSeriesLineChart;