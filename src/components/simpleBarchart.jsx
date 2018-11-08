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
		console.log(this.props.dataGet.map((d) => d.time))
		console.log(this.props.tickXValues)
		return (
			<VictoryChart
				theme={VictoryTheme.material}
				minDomain={{x: 0, y: 0}}
				domainPadding={{y: 50}}
				>
				<VictoryAxis
					tickValues = {this.props.dataGet.map((d) => d.time)}
					tickFormat = {this.props.tickXValues}
					label = {'Time'}
					axisLabelComponent={<VictoryLabel dy={20} />}
					tickLabelComponent={<VictoryLabel 
											style={{fontSize: 8}}
											dy={-5} />}
					/>
				<VictoryAxis
					dependentAxis
					tickValues = {this.props.tickYValues}
					tickFormat = {(t) => `${Math.round(t/1000)}k`}
					label = {'Requests'}
					axisLabelComponent={<VictoryLabel dy={-20} />}
					tickLabelComponent={<VictoryLabel 
											style={{fontSize: 10}}
											dx={5} />}
					/>
				<VictoryLegend
					x={100}
					y={0}
					title={this.props.title}
					centerTitle
					orientation='horizontal'
					style={{
						border: { stroke: 'black' },
						title: {fontSize: 14}
					}}
					gutter={20}
					data={[
						{name: 'GET', symbol: { fill: '#A3C3D9' }},
						{name: 'POST', symbol: { fill: '#CCD6EB' }}
						]}
				/>
				<VictoryStack
					colorScale = {['#A3C3D9', '#CCD6EB']}
					domainPadding = {{x: 10}}
					>
					<VictoryBar 
					data = {this.props.dataGet.map((d) => d)}
					alignment = 'middle'
					animate = {{
						duration: 1000,
						onLoad: {duration: 750}
					}}
					barRatio = {1}
					labels={this.props.dataGet.map((d) => d.amount)}
					labelComponent={<VictoryLabel 
										dy={30}
										dx={0}
										style={{fill: '#000',
												fontSize: '10'}} />}
					x = 'time'
					y = 'amount' 
					/>
					<VictoryBar 
					data = {this.props.dataPost.map((d) => d)}
					cornerRadius={5}
					alignment = 'middle'
					animate = {{
						duration: 1000,
						onLoad: {duration: 750}
					}}
					barRatio = {1}
					labels={this.props.dataPost.map((d) => d.amount)}
					labelComponent={<VictoryLabel 
										dy={30}
										dx={0}
										style={{fill: '#000',
												fontSize: '10'}} />}
					x = 'time'
					y = 'amount' 
					/>
				</VictoryStack>
			</VictoryChart>
			);
	};
};

export default SimpleBarchart;