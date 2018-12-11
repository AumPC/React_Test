import React, {Component} from 'react';
import ReactEcharts from 'echarts-for-react';

var datafile = require('./data-1498994055008-rJJ5SUU4W.csv');

class Domain extends Component {
	state = {
		option: {},
		data: []
	};

	async componentDidMount() {
		await this.setOptions();
	}

	setOptions = () => {
		this.setState({
			option: {
		        tooltip: {
		            trigger: 'item',
		            triggerOn: 'mousemove'
		        },
		        series:[
		            {
		                type: 'tree',

		                data: [{
		                		                	name: "root",
		                								children: [
		                									{
		                										name: "sub1",
		                										children: [
		                											{
		                												name: "subsub1",
		                												value: 322
		                											},
		                											{
		                												name: "subsub2",
		                												value: 111
		                											}
		                										]
		                									},
		                									{
		                										name: "sub2",
		                										children: [
		                											{
		                												name: "subsub2",
		                												value: 33322
		                											},
		                											{
		                												name: "subsub3",
		                												value: 111325
		                											}
		                										]
		                									}
		                								]
		                		                }],

		                left: '2%',
		                right: '2%',
		                top: '8%',
		                bottom: '20%',

		                symbol: 'emptyCircle',

		                orient: 'vertical',

		                expandAndCollapse: true,

		                label: {
		                    normal: {
		                        position: 'top',
		                        rotate: -90,
		                        verticalAlign: 'middle',
		                        align: 'right',
		                        fontSize: 9
		                    }
		                },

		                leaves: {
		                    label: {
		                        normal: {
		                            position: 'bottom',
		                            rotate: -90,
		                            verticalAlign: 'middle',
		                            align: 'left'
		                        }
		                    }
		                },

		                animationDurationUpdate: 750
		            }
		        ]
		    }
		});
	}

	render() {
		return(
			<div>
				<ReactEcharts option={this.state.option} />
			</div>
			);
	};
};

export default Domain;