import React, {Component} from 'react';
import DomainD3 from './domainD3';
import Paper from '@material-ui/core/Paper';
import CardContent from '@material-ui/core/CardContent';

class Domain extends Component {
	render() {
		return(
			<div className="content">
			<Paper>
				<CardContent>
					<DomainD3 />
				</CardContent>
			</Paper>
			</div>
			);
	}
};

export default Domain;