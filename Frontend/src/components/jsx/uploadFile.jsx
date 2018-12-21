import React, {Component} from 'react';
import axios, {post} from 'axios';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ReactLoading from "react-loading";

class UploadFile extends Component {
	constructor(props) {
		super(props);
		this.state ={
			file:null,
			loading: false
		}
		this.onFormSubmit = this.onFormSubmit.bind(this)
		this.onChange = this.onChange.bind(this)
		this.fileUpload = this.fileUpload.bind(this)
	}

	onFormSubmit(e) {
		e.preventDefault() // Stop form submit
		this.fileUpload(this.state.file).then((response)=>{
			console.log(response.data);
		})
	}

	onChange(e) {
		this.setState({file:e.target.files[0]})
	}

	fileUpload(file) {
		const url = 'http://localhost:8080/upload';
		// const url = '/public/logs';
		const formData = new FormData();
		formData.append('file',file)
		const config = {
			headers: {
				'content-type': 'multipart/form-data'
			}
		}
		this.setState({loading: true});
		return  post(url, formData, config).then(this.setState({loading: false}))
	}

	isLoading() {
		if (this.state.loading) {
			return(
				<ReactLoading />
				);
		} else {
			return(
				<button type="submit">Upload</button>
				);
		}
	}

	render() {
		let loading = this.isLoading();
		return (
			<div className="content">
			<Paper>
				<CardContent>
					<form onSubmit={this.onFormSubmit}>
					<h3>File Upload</h3>
					<hr />
					<CardContent>
						<input type="file" onChange={this.onChange} multiple/>
						<br/>
						{loading}
					</CardContent>
					</form>
				</CardContent>
			</Paper>
			</div>
			);
	}
};

export default UploadFile;