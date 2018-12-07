import React, {Component} from 'react';
import axios, {post} from 'axios';

class UploadFile extends Component {
	constructor(props) {
		super(props);
		this.state ={
			file:null
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
		const url = 'http://10.3.132.198:8080/upload';
		// const url = '/public/logs';
		const formData = new FormData();
		formData.append('file',file)
		const config = {
			headers: {
				'content-type': 'multipart/form-data'
			}
		}
		return  post(url, formData, config)
	}

	render() {
		return (
			<div className="card">
				<div className="header">
					<h4>File Upload</h4>
				</div>
				<div className="content">
					<form onSubmit={this.onFormSubmit}>
					<div className="form-group">
						<div className="row">
							<input type="file" onChange={this.onChange} multiple/>
						</div>
						<div className="row">
							<button type="submit">Upload</button>
						</div>
					</div>
					</form>
				</div>
			</div>
			);
	}
};

export default UploadFile;