import React, {Component} from 'react';
import {VictoryBar,
		VictoryLegend, 
		VictoryLabel,
		VictoryChart, 
		VictoryAxis, 
		VictoryTheme, 
		VictoryStack} from 'victory';

class SimpleBarchart extends Component {
	state = {

	};

	render () {
		let t = this.props.tickYValues
		return (
			<VictoryChart
				theme={VictoryTheme.material}
				minDomain = {{x: 0, y: 0}}
				maxDomain = {{x: 4, y: 7000}}
				>
				<VictoryAxis
					tickValues = {this.props.tickXValues}
					tickFormat = {this.props.dataGet.map((d) => d.time)}
					label = {'Time'}
					axisLabelComponent={<VictoryLabel dy={20}/>} />
				<VictoryAxis
					dependentAxis
					tickValues = {this.props.tickYValues}
					tickFormat = {(t) => `${Math.round(t/1000)}k`}
					label = {'Requests'}
					axisLabelComponent={<VictoryLabel dy={-30}/>}
					/>
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
						{name: 'GET', symbol: { fill: '#A3C3D9' }},
						{name: 'POST', symbol: { fill: '#CCD6EB' }}
						]}
				/>
				<VictoryStack
					colorScale = {['#A3C3D9', '#CCD6EB']}
					>
					<VictoryBar 
					data = {this.props.dataGet.map((d) => d)}
					alignment = 'start'
					animate = {{
						duration: 1000,
						onLoad: {duration: 750}
					}}
					barRatio = {1}
					labels={this.props.dataGet.map((d) => d.amount)}
					labelComponent={<VictoryLabel 
										dy={30}
										dx={20}
										style={{fill: 'white'}} />}
					x = 'method'
					y = 'amount' />
					<VictoryBar 
					data = {this.props.dataPost.map((d) => d)}
					alignment = 'start'
					animate = {{
						duration: 1000,
						onLoad: {duration: 750}
					}}
					barRatio = {1}
					labels={this.props.dataPost.map((d) => d.amount)}
					labelComponent={<VictoryLabel 
										dy={30}
										dx={20}
										style={{fill: 'white'}} />}
					x = 'method'
					y = 'amount' />
				</VictoryStack>
			</VictoryChart>
			);
	};
};

export default SimpleBarchart;