import React, {Component} from 'react';
import DomainD3 from './domainD3';
import Paper from '@material-ui/core/Paper';
import CardContent from '@material-ui/core/CardContent';
import axios from 'axios';

class Domain extends Component {
	state = {
		isLoadingTable: false,
		option: {},
		data: []
	};

	async componentDidMount() {
		await this.get_data();
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
		        	}
		        ]
		    }
		});
	};

	async get_data() {
		await axios.get("http://localhost:8080/domain").then((res) => {
			console.log(res);
		})
		.catch(error => this.setState({ isLoadingTable: true }));
	};

	render() {
		return(
			<div className="content">
			<Paper>
				<CardContent>
					<DomainD3 data={this.state.data}/>
				</CardContent>
			</Paper>
			</div>
			);
	};
};

export default Domain;