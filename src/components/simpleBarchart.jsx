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

	componentDidMount() {

	}

	render () {
		console.log(this.props.dataName)
		return (
			<div>
			<VictoryChart >
				<VictoryLegend
					x = {50}
					y = {0}
					gutter = {20}
					title = {this.props.title}
					data = {this.props.dataLegend}
					centerTitle
					orientation = "horizontal"
					style={{
						border: { stroke: 'black' },
						title: {fontSize: 10}
					}} />
				<VictoryStack>
					<VictoryBar 
						alignment = 'start'
						data = {this.props.dataGet}
						name = {this.props.dataName[0]}
						labels ={(d) => `${d.count}`}
						style = {{
							data: {fill: "#005792"}
						}}
						x = {this.props.dataX}
						y = {this.props.dataY} />
					<VictoryBar 
						alignment = 'start'
						data = {this.props.dataPost}
						name = {this.props.dataName[1]}
						labels ={(d) => `${d.count}`}
						style = {{
							data: {fill: "#53cde2"}
						}}
						x = {this.props.dataX}
						y = {this.props.dataY} />
					<VictoryBar 
						alignment = 'start'
						data = {this.props.dataDelete}
						name = {this.props.dataName[2]}
						labels ={(d) => `${d.count}`}
						style = {{
							data: {fill: "green"}
						}}
						x = {this.props.dataX}
						y = {this.props.dataY} />
					<VictoryBar 
						alignment = 'start'
						data = {this.props.dataHttps}
						name = {this.props.dataName[3]}
						labels ={(d) => `${d.count}`}
						style = {{
							data: {fill: "#d1e0fa"}
						}}
						x = {this.props.dataX}
						y = {this.props.dataY} />
					<VictoryBar 
						alignment = 'start'
						data = {this.props.dataHead}
						name = {this.props.dataName[4]}
						labels ={(d) => `${d.count}`}
						style = {{
							data: {fill: "red"}
						}}
						x = {this.props.dataX}
						y = {this.props.dataY} />
				</VictoryStack>
			</VictoryChart>
			</div>
			);
	};
};

export default SimpleBarchart;