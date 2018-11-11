import React, { Component } from 'react';
import SimpleBarchart from './simpleBarchart';
import TimeSeriesLineChart from './timeSeriesLineChart';
import ReactLoading from "react-loading";
import axios from 'axios';
import { runInThisContext } from 'vm';

class Body extends Component {

	state = {
		isLoadingMethod: false,
		isLoadingReq: false,
		dataMethod: {},
		dataReq: { Egress: [], Ingress: [] },
		tickXBar: [],
		tickXLine: [],
	};

	componentDidMount() {
		this.setState({ isLoadingMethod: true, isLoadingReq: true })
		this.get_method_stack()
		this.get_req_count()
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
				this.time_range = []
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
						if (this.datas[key][methods] !== undefined) {
							this.dataMethod[methods].push({ "date": key, "count": this.datas[key][methods] })
						} else {
							this.dataMethod[methods].push({ "date": key, "count": 0 })
						}
					}
				}
				console.log("DataMethod", this.dataMethod, Object.keys(this.datas))
				this.setState({ isLoadingMethod: false, dataMethod: this.dataMethod, tickXBar: Object.keys(this.datas) })
			})
			.catch(error => this.setState({ isLoadingMethod: false }));
	}

	async get_req_count() {
		let egressRes = await this.get_count("Egress",  	[ { "regexp": { "src_ip.keyword": "158.108.*"	} }, 
													{ "regexp": { "src_ip.keyword": "10.*" } } 
												])
		let ingressRes = await this.get_count("Ingress",  	[ { "regexp": { "dst_ip.keyword": "158.108.*"	} }, 
													{ "regexp": { "dst_ip.keyword": "10.*" } } 
												])
		let date = await Object.keys((egressRes)).concat(Object.keys((ingressRes))).reduce(function(a,b){if(a.indexOf(b)<0)a.push(b);return a;},[]);
		this.dataReq = { Egress: [], Ingress: [] }
		date.forEach(datekey => {
			if (datekey in egressRes) { this.dataReq.Egress.push({ "date": datekey, "count": egressRes[datekey] })
							} else { this.dataReq.Egress.push({ "date": datekey, "count": 0 }) }
							
			if (datekey in ingressRes) { this.dataReq.Ingress.push({ "date": datekey, "count": ingressRes[datekey] })
							} else { this.dataReq.Ingress.push({ "date": datekey, "count": 0 }) }
		});
		console.log("DataReq", this.dataReq, date)
		await this.setState({ isLoadingReq: false, dataReq: this.dataReq, tickXLine: date })		
	}

	async get_count(types, query) {
		this.queryCount = await {
			"query": {
				"bool": {
					"should": [ query ]
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
		return await axios.get("http://10.3.132.198:9200/web-anon/_search", {
			params: {
				source: JSON.stringify(this.queryCount),
				source_content_type: 'application/json'
			}
		})
		.then((res) => {
			this.datas = {}
			res['data']['aggregations']['req_time_group']['buckets'].forEach(data => {
				this.datas[data['key_as_string']] = data['doc_count'] ;
			});
			console.log(types, this.datas)
			return this.datas
		})
	}

	render() {
		if (this.state.isLoadingMethod || this.state.isLoadingReq) {
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