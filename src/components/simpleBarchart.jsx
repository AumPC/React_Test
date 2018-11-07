import React, {Component} from 'react';
import {VictoryBar, VictoryChart, VictoryAxis, VictoryTheme} from 'victory';

// const data = [
// 			{method: 'POST', amount: 3000},
// 			{method: 'GET', amount: 2500}
// ];

class SimpleBarchart extends Component {
	state = {

	};

	render () {
		return (
			<VictoryChart
				theme={VictoryTheme.material}
				domainPadding = {30}>
				<VictoryAxis
					tickValues = {this.props.tickValues}
					tickFormat = {this.props.data.map((d) => d.method)}
					/>
				<VictoryAxis
					dependentAxis
					tickFormat = {(x) => (`${x}`)}
					/>
				<VictoryBar 
					data = {this.props.data}
					alignment = 'middle'
					animate = {{
						duration: 1000,
						onLoad: {duration: 750}
					}}
					barRatio = {0.5}
					x = 'method'
					y = 'amount'
				/>
			</VictoryChart>
			);
	};
};

export default SimpleBarchart;