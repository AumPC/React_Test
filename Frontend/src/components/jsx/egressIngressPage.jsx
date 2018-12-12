import React, {Component} from 'react';
import Tables from './tables';
import ReactLoading from "react-loading";
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import CardContent from '@material-ui/core/CardContent';

class EgressIngressPage extends Component {
	state = {
		isLoadingTable: false,
		tableData: [{
				username: "sdgs",
				egress: 8148,
				ingress: 15125,
				total: 32525,
				last: 32525
			},
			{
				username: "mvmvmb",
				egress: 23526,
				ingress: 235952,
				total: 245253,
				last: 325235
			}]
	};

	async componentDidMount() {
		await this.setState({ isLoadingTable: true })
		await this.get_table()
	}

	async get_table() {
		let i=0;
		let table = []
		let dummy = {
			username: "",
			ip: "",
			egress: 0,
			ingress: 0,
			total: 0,
			last: ""
		}
		await axios.get("http://localhost:8080/usertable").then((res) => {
			// console.log("DataTable", res.data.requests[0], res.data.requests.length)
			for(i; i<res.data.requests.length; i++) {
				dummy['username'] = res.data.requests[i][0]['user']
				dummy['ip'] = res.data.requests[i][0]['ip']
				dummy['egress'] = res.data.requests[i][0]['egress']
				dummy['ingress'] = res.data.requests[i][0]['ingress']
				dummy['total'] = res.data.requests[i][0]['ingress'] + res.data.requests[i][0]['egress']
				dummy['last'] = res.data.requests[i][0]['time']
				// console.log(i, dummy)
				table.push(dummy)
				dummy = {
					username: "",
					ip: "",
					egress: 0,
					ingress: 0,
					total: 0,
					last: ""
				}
			}
			// console.log(table)
			this.setState({ isLoadingTable: false, tableData: table })
		})
		.catch(error => this.setState({ isLoadingTable: false }));
	}

	checkIsLoading() {
		if (this.state.isLoadingTable) {
			return <ReactLoading type="spinningBubbles" color="black"/>;
		} else {
			return (
					<Tables
						data={this.state.tableData} />
				);
		}
	}

	render() {
		let render = this.checkIsLoading();
		return(
			<div className="content">
				<Paper>
					<CardContent>
						{render}
					</CardContent>
				</Paper>
			</div>
			);
	};
};

export default EgressIngressPage;