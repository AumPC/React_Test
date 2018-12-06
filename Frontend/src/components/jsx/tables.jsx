import React, {Component} from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";


class Tables extends Component {

	render() {
		console.log(this.props.data)
		return(
				<div>
					<ReactTable 
						data={this.props.data}
						columns={[
							{
								Header: "Top most User",
								columns: [
									{
										Header: "Username",
										accessor: 'username'
									},
									{
										Header: "IP",
										accessor: 'ip'
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
										Header: "Total",
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