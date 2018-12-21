import React, {Component} from 'react';
import ReactEcharts from 'echarts-for-react';
import axios from 'axios';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
require('echarts/map/js/world.js');

class World extends Component {
	state = {
		isLoadingTable: false,
		option1: {},
		option2: {},
		option3: {},
		egress: [],
		ingress: [],
		total: [],
		map: "total"
	};

	async componentDidMount() {
		await this.get_world();
		await this.setOptions();
	};

	async get_world() {
		await axios.get("http://localhost:8080/map").then((res) => {
			this.setState({egress: res.data.Egress, ingress: res.data.Ingress, total: res.data.Total, map: "total"})
		})
		.catch(error => this.setState({ isLoadingTable: true }));
	};

	setOptions = () => {
		this.setState({
			option1: {
				title: {
					text: 'World Map',
					subtext: 'Ingress/Egress from countries',
					left: 'center'
				},
			    tooltip: {
			        trigger: 'item',
					formatter: function (params) {
						return params.seriesName + '<br/>' + params.name + ' : ' + Math.pow(params.value,2).toFixed(0) ;
					}
			    },
			    visualMap: {
			    	min: 0,
			    	max: this.state.egress.max,
			    	left: 'left',
					top: 'bottom',
					precision: 0,
			    	text: ['high','low'],
					calculable: false,
					inRange: {
						color: ["#ADD7F6", "#3F8EFC", "#3B28CC"],
						symbolSize: [20, 100]
					}
			    },
			    series: [
				    {	name: "Total",
				    	type: "map",
				    	mapType: "world",
				    	label: {
				    		normal: {
				    			show: false
				    		},
					    	emphasis: {
					    		show: true
						    }
						},
						data: this.state.total.data
					}
			    ]
			},
			option2: {
				title: {
					text: 'World Map',
					subtext: 'Egress from countries',
					left: 'center'
				},
			    tooltip: {
			        trigger: 'item',
					formatter: function (params) {
						return params.seriesName + '<br/>' + params.name + ' : ' + Math.pow(params.value,2).toFixed(0) ;
					}
			    },
			    visualMap: {
			    	min: 0,
			    	max: this.state.egress.max,
			    	left: 'left',
					top: 'bottom',
					precision: 0,
			    	text: ['high','low'],
					calculable: false,
					inRange: {
						color: ["#ADD7F6", "#3F8EFC", "#3B28CC"],
						symbolSize: [20, 100]
					}
			    },
			    series: [{	name: "Egress",
				    	type: "map",
				    	mapType: "world",
				    	label: {
				    		normal: {
				    			show: false
				    		},
					    	emphasis: {
					    		show: true
						    }
						},
						data: this.state.egress.data
					}]
			},
			option3: {
				title: {
					text: 'World Map',
					subtext: 'Ingress from countries',
					left: 'center'
				},
			    tooltip: {
			        trigger: 'item',
					formatter: function (params) {
						return params.seriesName + '<br/>' + params.name + ' : ' + Math.pow(params.value,2).toFixed(0) ;
					}
			    },
			    visualMap: {
			    	min: 0,
			    	max: this.state.egress.max,
			    	left: 'left',
					top: 'bottom',
					precision: 0,
			    	text: ['high','low'],
					calculable: false,
					inRange: {
						color: ["#ADD7F6", "#3F8EFC", "#3B28CC"],
						symbolSize: [20, 100]
					}
			    },
			    series: [{	name: "Ingress",
				    	type: "map",
				    	mapType: "world",
				    	label: {
				    		normal: {
				    			show: false
				    		},
					    	emphasis: {
					    		show: true
						    }
						},
						data: this.state.ingress.data
					}]
			}
		})
	};

	componentDidUpdate() {
		this.handleMap();
	};

	handleTotal = () => {
		this.setState({map: "total"});
	};

	handleEgress = () => {
		this.setState({map: "egress"});
	};


	handleIngress = () => {
		this.setState({map: "ingress"});
	};

	handleMap() {
		if (this.state.map === "total") {
			return(
				<div>
				<ReactEcharts
							option={this.state.option1}
							style={{height: '600%', width: '100%'}} />
				</div>);
		} else if (this.state.map === "egress") {
			return(<ReactEcharts
							option={this.state.option2}
							style={{height: '600%', width: '100%'}} />);
		} else {
			return(<ReactEcharts
							option={this.state.option3}
							style={{height: '600%', width: '100%'}} />);
		}
	};

	render() {
		let map = this.handleMap();
		return(
			<div className="content">
				<Button color="secondary" type="button" onClick={this.handleTotal}>Total</Button>
				<Button color="secondary" type="button" onClick={this.handleEgress}>Egress</Button>
				<Button color="secondary" type="button" onClick={this.handleIngress}>Ingress</Button>
				<Paper>
					<CardContent>
						{map}
					</CardContent>
				</Paper>
			</div>
			);
	};
};

export default World;