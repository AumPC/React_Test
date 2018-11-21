import React, {Component} from 'react';
import ReactEcharts from 'echarts-for-react';


class SimpleBarchart extends Component {
	state = {
		color: ['#B3E5FC', '#81D4FA', '#4FC3F7', '#29B6F6', '#03A9F4', '#039BE5', '#0288D1', '#0277BD', '#01579B'],
		option: {
			
		}
	};

	componentDidMount() {
		this.setOption();
	}

	componentDidUpdate(prevProps) {
		if (this.props.dataDate !== prevProps.dataDate) {
			this.setOption();
		}
	};

	setOption = () => {
		this.setState({
			option: {
				legend: {
					data: this.props.dataLegend,
					algin: 'left'
					},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true
				},
				tooltip: {
					trigger: 'axis',
					axisPointer : {
						type : 'shadow'
					}
				},
				xAxis: {
					name: 'Time',
					type: 'category',
					data: this.props.dataDate,
					axisLabel: {
						// rotate: 45,
						fontSize: 8
					}
				},
				yAxis: {
					name: 'requests',
					type: 'value',
					axisLabel: {
						formatter: '{value} req'
					}
				},
				series: [{
					name: 'GET',
					type: 'bar',
					stack: 'stackBar',
					label: {
						normal: {
							show: false,
						}
					},
					data: this.props.dataMethod['GET']
				},
				{
					name: 'HEAD',
					type: 'bar',
					stack: 'stackBar',
					label: {
						normal: {
							show: false,
						}
					},
					data: this.props.dataMethod['HEAD']
				},
				{
					name: 'POST',
					type: 'bar',
					stack: 'stackBar',
					label: {
						normal: {
							show: false,
						}
					},
					data: this.props.dataMethod['POST']
				},
				{
					name: 'PUT',
					type: 'bar',
					stack: 'stackBar',
					label: {
						normal: {
							show: false,
						}
					},
					data: this.props.dataMethod['PUT']
				},
				{
					name: 'DELETE',
					type: 'bar',
					stack: 'stackBar',
					label: {
						normal: {
							show: false,
						}
					},
					data: this.props.dataMethod['DELETE']
				},
				{
					name: 'CONNECT',
					type: 'bar',
					stack: 'stackBar',
					label: {
						normal: {
							show: false,
						}
					},
					data: this.props.dataMethod['CONNECT']
				},
				{
					name: 'OPTIONS',
					type: 'bar',
					stack: 'stackBar',
					label: {
						normal: {
							show: false,
						}
					},
					data: this.props.dataMethod['OPTIONS']
				},
				{
					name: 'TRACE',
					type: 'bar',
					stack: 'stackBar',
					label: {
						normal: {
							show: false,
						}
					},
					data: this.props.dataMethod['TRACE']
				},
				{
					name: 'PATCH',
					type: 'bar',
					stack: 'stackBar',
					label: {
						normal: {
							show: false,
						}
					},
					data: this.props.dataMethod['PATCH']
				},
				]
			}}, this.render);
	};

	render () {
		// console.log('legend', this.props.dataLegend)
		// console.log(this.props.dataDate);
		// console.log(this.props.dataMethod['GET'][0]);
		return (
			<div>
				<ReactEcharts option={this.state.option} />
			</div>
			);
	};
};

export default SimpleBarchart;