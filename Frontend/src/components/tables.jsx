import React, {Component} from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";


class Tables extends Component {
	constructor() {
		super();
		this.state = {
			data: []
		}
	}

	render() {
		return(
				<div>
					<ReactTable 
						data={this.state.data}
						columns={[
							{
								Header: "Name",
								columns: [
									{
										Header: "First Name",
										accessor: "firstname"
									},
									{
										Header: "Last Name",
										accessor: "lastname"
									}
								]
							},
							{
								Header: "Info",
								columns: [
									{
										Header: "Visit",
										accessor: "visit"
									},
									{
										Header: "Egress",
										accessor: "egress"
									},
									{
										Header: "Ingress",
										accessor: "ingress"
									}
								]
							}
							]}
							defaultPageSize = {10}
							className="-striped -highlight"
					/>
				</div>
			);
	};
};

export default Tables;