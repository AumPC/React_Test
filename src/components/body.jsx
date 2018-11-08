import React, {Component} from 'react';
import SimpleBarchart from './simpleBarchart';
import TimeSeriesLineChart from './timeSeriesLineChart';
import ReactLoading from "react-loading";
import axios from 'axios';

class Body extends Component {
	state = {
		isLoading: false,
		dataGet: [
		{
			time: '1-Nov',
			amount: 3000
		},
		{
			time: '2-Nov',
			amount: 2300
		},
		{
			time: '3-Nov',
			amount: 2000
		},
		{
			time: '4-Nov',
			amount: 2900
		}],
		dataPost: [
		{
			time: '1-Nov',
			amount: 3000
		},
		{
			time: '2-Nov',
			amount: 2500
		},
		{
			time: '3-Nov',
			amount: 3300
		},
		{
			time: '4-Nov',
			amount: 2900
		}],
		dataTime: [
			{
				data: [
				{x: 1, y: 300},
				{x: 2, y: 250},
				{x: 3, y: 180},
				{x: 4, y: 200}]
			},
			{
				data: [
				{x: 1, y: 240},
				{x: 2, y: 380},
				{x: 3, y: 300},
				{x: 4, y: 340}]
			}
		],
		tickXValues: [0, 1, 2, 3],
		tickYValues: [1000, 2000, 3000, 4000, 5000, 6000, 7000],
		label_x: 'Time',
		label_y: 'Requests'
	};

	componentDidMount() {
		this.setState({ isLoading: true });
		this.query = {
			"size": 0,
			"aggs" : {
				"req_time_group" : {
					"date_histogram" : {
						"field" : "req_time_human",
						"interval" : "30s"
					},
					"aggs" : {
						"method_group" : {
							"terms" : { "field" : "method.keyword" }
						}
					}
				}
			}
		}
		axios.get("http://10.3.132.198:9200/web-anon/_search", {
			params: {
				source: JSON.stringify(this.query),
				source_content_type: 'application/json'
				
		}})
		.then((res) => {
			this.datas = {}
			res['data']['aggregations']['req_time_group']['buckets'].forEach((data) => {
				if( !(data['key_as_string'] in this.datas) ) {
					this.datas[data['key_as_string']] = {};
				} 
				data['method_group']['buckets'].forEach((type_method) => {
					this.datas[data['key_as_string']][type_method['key']] = type_method['doc_count'];
				})
			})
			this.dataMethod = { "GET" : [], "POST" : [], "PUT" : [], "DELETE" : [], "HTTPS" : [], "HEAD" : []};
			for(var key in this.datas) {
				for(var methods in this.dataMethod) {
					if( this.datas[key][methods] != undefined ) {
						this.dataMethod[methods].push({ "date" : key, "count" : this.datas[key][methods] })
					} else {
						this.dataMethod[methods].push({ "date" : key, "count" : 0 })
					}
				}
			}
			console.log("E",this.dataMethod)
			this.setState({ isLoading: false, dataMethod: this.dataMethod});
		  })
		.catch(error => this.setState({
		  isLoading: false
		}));
	  }	

	render () {
		
		if (this.state.isLoading) {
			return <ReactLoading type="spinningBubbles" color="black"/>;
		}

		return (
			<div className='body-container'>
				<SimpleBarchart 
					dataGet={this.state.dataGet}
					dataPost={this.state.dataPost}
					tickXValues={this.state.tickXValues}
					tickYValues={this.state.tickYValues}
				/>
				<TimeSeriesLineChart 
					data={this.state.dataTime}
					label_x={this.state.label_x}
					label_y={this.state.label_y}
				/>
			</div>
			);
	};
};

export default Body;