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
		dataMethod: {"GET": [], "HEAD": [], "POST": [], "POST": [], "DELETE": [], "CONNECT": [], "OPTIONS": [], "TRACE": [], "PATCH": []},
		dataLegend: ["GET", "HEAD", "POST", "PUT", "DELETE", "CONNECT", "OPTIONS", "TRACE", "PATCH"],
		dataDate: [],
		xAxis: [100, 200, 300],
		dataReq: { Egress: [], Ingress: [] }
	};

	componentDidMount() {
		this.get_all_data();
	}

	get_all_data() {
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
				this.dataDate = [];
				this.allMethods = ["GET", "HEAD", "POST", "PUT", "DELETE", "CONNECT", "OPTIONS", "TRACE", "PATCH"];
				this.dataMethod = {"GET": [], "HEAD": [], "POST": [], "POST": [], "DELETE": [], "CONNECT": [], "OPTIONS": [], "TRACE": [], "PATCH": []};
					for (var key in this.datas) {
						// console.log('key: ', key);
						this.dataDate.push(key);
						for (var method in this.dataMethod) {
							// console.log('methis', method)
							// console.log('met', this.datas[key][method])
							if (this.datas[key][method] !== undefined) {
								// console.log('before', this.dataMethod[method]);
								// console.log('input', { "date": key, "count": this.datas[key][method] })
								// this.dataMethod[method].push({ "date": key, "count": this.datas[key][method] });
								this.dataMethod[method].push(this.datas[key][method]);
								// console.log('after', this.dataMethod);
								// console.log('after', this.dataMethod[method]);
							} else {
								// this.dataMethod[method].push({ "date": key, "count": 0 });
								this.dataMethod[method].push(0);
							}
						}
					};
				this.setState({ isLoadingMethod: false, 
								dataMethod: this.dataMethod,
								dataDate: this.dataDate });
				// console.log('state data method',this.state.dataMethod);
			})
			.catch(error => this.setState({ isLoadingMethod: false }));
			// console.log(this.state.dataMethod);
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
				let dataTemp = this.state.dataReq
				dataTemp.Ingress = this.datas
				this.setState({ isLoadingIngress: false, dataReq : dataTemp })
			})
			.catch(error => this.setState({ isLoadingIngress: false }));
	}

	checkLoading() {
		if (this.isLoadingMethod || this.isLoadingEgress || this.isLoadingIngress) {
			return <ReactLoading type="spinningBubbles" color="black"/>;
		} else {
			return (
				<div className='body-container'>
				<SimpleBarchart 
					title = "# of requests method by time"
					dataLegend = {this.state.dataLegend}
					dataDate = {this.state.dataDate}
					dataMethod = {this.state.dataMethod} />
				</div>
				);
		}
	}

	render() {
		let barcharts = this.checkLoading();
		
		return (
			<div className="body-container">
				{barcharts}

			</div>
		);
	};
};

export default Body;