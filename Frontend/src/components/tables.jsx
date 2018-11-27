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
								Header: "Top most User",
								columns: [
									{
										Header: "Userame",
										accessor: 'username'
									}
								]
							},
							{
								Header: "Info",
								columns: [
									{
										Header: "Egress",
										accessor: "egress"
									},
									{
										Header: "Ingress",
										accessor: "ingress"
									},
									{
										Header: "Total Requests",
										accessor: "total"
									},
									{
										Header: "Last Request",
										accessor: "last"
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