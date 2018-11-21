import React, {Component} from 'react';
import ReactEcharts from 'echarts-for-react';


class TimeSeriesLineChart extends Component {
	state = {
		option: {}
	};

	componentDidMount() {
		this.setOptions();
	};

	componentDidUpdate(prevProps) {
		if (this.props.dataDate !== prevProps.dataDate) {
			// console.log('true')
			this.setOptions();
		}
	};

	setOptions = () => {
		this.legend = Object.keys(this.props.dataReq);
		this.series = []
		this.legend.forEach(data => {
			this.series.push(
				{
					name: data,
					type:'line',
					data: this.props.dataReq[data]
				}
			)
		});
		this.setState({
			option: {
				title: {
					text: 'Egress Ingress Chart'
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						crossStyle: {
							color: '#999'
						}
					}
				},
				toolbox: {
					// y: 'bottom',
					title: {
						stack: 'Stack'
					},
					feature: {
						magicType: {
							title: {
								line: 'line',
								bar: 'bar',
								stack: 'stack',
								tiled: 'tiled'
							},
							type: ['line', 'bar', 'stack', 'tiled']
						}
					}
				},
				legend: {
					data: this.legend
				},
				xAxis: [
				{
					type: 'category',
					name: 'Time',
					data: this.props.dataDate,
					axisPointer: {
						type: 'shadow'
					},
					axisLabel: {
						// rotate: 45,
						fontSize: 8
					}
				}
				],
				yAxis: [
				{
					type: 'value',
					name: 'Requests',
					min: 0,
					axisLabel: {
						formatter: '{value} req'
					}
				}
				],
				series: this.series
			}
		});
	}

	render () {
		// console.log('thisdata', this.props.dataEgress['date'])

		return (
			<div>
				<ReactEcharts option={this.state.option} />
			</div>
			);
	};
};

export default TimeSeriesLineChart;