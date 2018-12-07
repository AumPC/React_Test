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
		this.legend = Object.keys(this.props.dataMethod);
		this.series = []
		this.legend.forEach(data => {
			this.series.push(
				{
					name: data,
					type: 'bar',
					stack: 'stackBar',
					label: {
						normal: {
							show: false,
						}
					},
					data: this.props.dataMethod[data]
				}
			)
		});
		this.setState({
			option: {
				title: {
					text: 'Method Types Chart'
				},
				legend: {
					data: this.legend,
					align: 'auto',
					width: '450'
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
					name: 'Requests',
					type: 'value',
					axisLabel: {
						formatter: '{value} req'
					}
				},
				series: this.series
			}}, this.render);
	};

	render () {
		return (
			<div>
				<ReactEcharts option={this.state.option} />
			</div>
			);
	};
};

export default SimpleBarchart;