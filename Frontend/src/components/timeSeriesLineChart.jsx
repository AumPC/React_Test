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
		this.setState({
			option: {
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						crossStyle: {
							color: '#999'
						}
					}
				},
				legend: {
					data:['Egress','Ingress','Data Request']
				},
				xAxis: [
				{
					type: 'category',
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
					name: '# of requests',
					min: 0,
					axisLabel: {
						formatter: '{value} req'
					}
				}
				],
				series: [
				{
					name:'Egress',
					type:'bar',
					data: this.props.dataEgress['count']
				},
				{
					name:'Ingress',
					type:'bar',
					data: this.props.dataIngress['count']
				},
				{
					name:'Data Request',
					type:'line',
					data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
				}
				]
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