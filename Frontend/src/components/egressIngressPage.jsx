import React, {Component} from 'react';
import Tables from './tables';
import World from './world';

class EgressIngressPage extends Component {
	state = {};

	render() {
		return(
			<div>
			<Tables />
			<World />
			</div>
			);
	};
};

export default EgressIngressPage;