import React, { Component } from 'react';
import SimpleBarchart from './simpleBarchart';
import TimeSeriesLineChart from './timeSeriesLineChart';
import ReactLoading from "react-loading";
import axios from 'axios';

class Body extends Component {

	state = {
		isLoadingMethod: false,
		isLoadingEgress: false,
		isLoadingIngress: false,
		dataMethod: {"GET": [], "HEAD": [], "POST": [], "POST": [], "DELETE": [], "CONNECT": [], "OPTIONS": [], "TRACE": [], "PATCH": []},
		dataLegend: ["GET", "HEAD", "POST", "PUT", "DELETE", "CONNECT", "OPTIONS", "TRACE", "PATCH"],
		dataDate: [],
		dataDateTimeSeries: [],
		dataReq: { Egress: [], Ingress: [] },
		dataEgress: {},
		dataIngress: {}
	};

	componentDidMount() {
		this.get_all_data();
	}

	get_all_data() {
		this.setState({ isLoadingMethod: true, isLoadingEgress: true, isLoadingIngress: true })
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

	async get_req_count() {
		let egressRes = await this.get_count("Egress",  	[ { "regexp": { "src_ip.keyword": "158.108.*"	} }, 
													{ "regexp": { "src_ip.keyword": "10.*" } } 
												])
		let ingressRes = await this.get_count("Ingress",  	[ { "regexp": { "dst_ip.keyword": "158.108.*"	} }, 
													{ "regexp": { "dst_ip.keyword": "10.*" } } 
												])
		let date = await Object.keys((egressRes)).concat(Object.keys((ingressRes))).reduce(function(a,b){if(a.indexOf(b)<0)a.push(b);return a;},[]);
		this.dataReq = { Egress: [], Ingress: [] }
		this.dataEgress = { date: [], count: []}
		this.dataIngress = { date: [], count: []}
		this.dataTotal = { date: [], count: []}
		date.forEach(datekey => {
			if (datekey in egressRes) { 
				this.dataReq.Egress.push({ "date": datekey, "count": egressRes[datekey]})
				this.dataEgress.date.push(datekey)
				this.dataEgress.count.push(egressRes[datekey])
			} else {
				this.dataReq.Egress.push({ "date": datekey, "count": 0 }) 
				this.dataEgress.date.push(datekey)
				this.dataEgress.count.push(0)
			}
							
			if (datekey in ingressRes) { 
				this.dataReq.Ingress.push({ "date": datekey, "count": ingressRes[datekey] })
				this.dataIngress.date.push(datekey)
				this.dataIngress.count.push(ingressRes[datekey])
			} else { this.dataReq.Ingress.push({ "date": datekey, "count": 0 }) 
				this.dataIngress.date.push(datekey)
				this.dataIngress.count.push(0)
			}
		});
		// console.log("DataReq", this.dataReq, date)
		await this.setState({ isLoadingReq: false,
								dataReq: this.dataReq,
								dataDateTimeSeries: date,
								dataEgress: this.dataEgress,
								dataIngress: this.dataIngress })		
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
			// console.log('aaa',types, this.datas)
			return this.datas
		})
	}

	checkBarchartsIsLoading() {
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

	checkTimeSeriesIsLoading() {
		if (this.isLoadingMethod || this.isLoadingEgress || this.isLoadingIngress) {
			return <ReactLoading type="spinningBubbles" color="black"/>;
		} else {
			return (
				<div className='body-container'>
				<TimeSeriesLineChart 
					title = "# of requests method by time"
					dataReq = {this.state.dataReq}
					dataDate = {this.state.dataDateTimeSeries}
					dataEgress = {this.state.dataEgress}
					dataIngress = {this.state.dataIngress} />
				</div>
				);
		}
	}

	render() {
		let barcharts = this.checkBarchartsIsLoading();
		let timeSerires = this.checkTimeSeriesIsLoading();
		
		return (
			<div className="body-container">
				{barcharts}
				{timeSerires}
			</div>
		);
	};
};

export default Body;