import React, {Component} from 'react';
import Tables from './tables';
import World from './world';

class EgressIngressPage extends Component {
	state = {
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

	render() {
		return(
			<div>
			<Tables
				data={this.state.tableData} />
			<World />
			</div>
			);
	};
};

export default EgressIngressPage;