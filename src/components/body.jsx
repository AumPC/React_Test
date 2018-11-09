import React, { Component } from 'react';
import SimpleBarchart from './simpleBarchart';
import TimeSeriesLineChart from './timeSeriesLineChart';
import ReactLoading from "react-loading";
import axios from 'axios';
import { runInThisContext } from 'vm';

class Body extends Component {

	state = {
		isLoadingMethod: false,
		isLoadingEgress: false,
		isLoadingIngress: false,
		dataMethod: {},
		dataReq: { Egress: [], Ingress: [] },
		tickXBar: [],
	};

	componentDidMount() {
		this.setState({ isLoadingMethod: true, isLoadingEgress: true, isLoadingIngress: true })
		this.get_method_stack()
		this.get_egress_count()
		this.get_ingress_count()
	}

	get_method_stack() {
		this.queryMethod = {
			"size": 0,
			"aggs": {
				"req_time_group": {
					"date_histogram": {
						"field": "req_time_human",
						"interval": "30s"
					},
					"aggs": {
						"method_group": {
							"terms": { "field": "method.keyword" }
						}
					}
				}
			}
		}
		axios.get("http://10.3.132.198:9200/web-anon/_search", {
			params: {
				source: JSON.stringify(this.queryMethod),
				source_content_type: 'application/json'
			}
		})
			.then((res) => {
				this.datas = {}
				res['data']['aggregations']['req_time_group']['buckets'].forEach((data) => {
					if (!(data['key_as_string'] in this.datas)) {
						this.datas[data['key_as_string']] = {};
					}
					data['method_group']['buckets'].forEach((type_method) => {
						this.datas[data['key_as_string']][type_method['key']] = type_method['doc_count'];
					})
				})
				this.dataMethod = { "GET": [], "POST": [], "PUT": [], "DELETE": [], "HTTPS": [], "HEAD": [] };
				for (var key in this.datas) {
					for (var methods in this.dataMethod) {
						if (this.datas[key][methods] != undefined) {
							this.dataMethod[methods].push({ "date": key, "count": this.datas[key][methods] })
						} else {
							this.dataMethod[methods].push({ "date": key, "count": 0 })
						}
					}
				}
				console.log("Method", this.dataMethod)
				this.setState({ isLoadingMethod: false, dataMethod: this.dataMethod })
			})
			.catch(error => this.setState({ isLoadingMethod: false }));
	}

	get_egress_count() {
		this.queryEgress = {
			"query": {
				"bool": {
					"should": [
						{
							"regexp": {
								"src_ip.keyword": "158.108.*"
							}
						},
						{
							"regexp": {
								"src_ip.keyword": "10.*"
							}
						}
					]
				}
			},
			"size": 0,
			"aggs": {
				"req_time_group": {
					"date_histogram": {
						"field": "req_time_human",
						"interval": "30s"
					}
				}
			}
		}
		axios.get("http://10.3.132.198:9200/web-anon/_search", {
			params: {
				source: JSON.stringify(this.queryMethod),
				source_content_type: 'application/json'
			}
		})
			.then((res) => {
				this.datas = res['data']['aggregations']['req_time_group']['buckets'].map(data => {
					return { "date": data['key_as_string'], "count": data['doc_count'] };
				});
				console.log("Egress", this.datas)
				let dataTemp = this.state.dataReq
				dataTemp.Egress = this.datas
				this.setState({ isLoadingEgress: false, dataReq : dataTemp })
			})
			.catch(error => this.setState({ isLoadingEgress: false }));
	}


	get_ingress_count() {
		this.queryIngress = {
			"query": {
				"bool": {
					"should": [
						{
							"regexp": {
								"dst_ip.keyword": "158.108.*"
							}
						},
						{
							"regexp": {
								"dst_ip.keyword": "10.*"
							}
						}
					]
				}
			},
			"size": 0,
			"aggs": {
				"req_time_group": {
					"date_histogram": {
						"field": "req_time_human",
						"interval": "30s"
					}
				}
			}
		}
		axios.get("http://10.3.132.198:9200/web-anon/_search", {
			params: {
				source: JSON.stringify(this.queryMethod),
				source_content_type: 'application/json'
			}
		})
			.then((res) => {
				this.datas = []
				this.datas = res['data']['aggregations']['req_time_group']['buckets'].map(data => {
					return { "date": data['key_as_string'], "count": data['doc_count'] };
				});
				console.log("Ingress", this.datas)
				let dataTemp = this.state.dataReq
				dataTemp.Ingress = this.datas
				this.setState({ isLoadingIngress: false, dataReq : dataTemp })
			})
			.catch(error => this.setState({ isLoadingIngress: false }));
	}

	render() {
		if (this.isLoadingMethod || this.isLoadingEgress || this.isLoadingIngress) {
			return <ReactLoading type="spinningBubbles" color="black"/>;
		}
		
		return (
			<div className='body-container'>
				{/* <SimpleBarchart
					title={'# of requests by time'}
					dataGet={this.state.dataGet}
					dataPost={this.state.dataPost}
					tickXValues={this.state.tickXBar}
					tickYValues=[]
				/>
				<TimeSeriesLineChart 
					title={'# of Ingress&Egress by time'}
					data={this.state.dataTime}
					label_x="Time"
					label_y="Request"
				/> */}
			</div>
		);
	};
};

export default Body;