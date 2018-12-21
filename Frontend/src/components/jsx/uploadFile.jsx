import React, {Component} from 'react';
import axios, {post} from 'axios';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import ReactLoading from "react-loading";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class UploadFile extends Component {
	constructor(props) {
		super(props);
		this.state ={
			file: null,
			loading: false,
			done: false,
			open: false
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
		// const url = 'http://10.3.132.198:8080/upload';
		// const url = '/public/logs';
		const formData = new FormData();
		formData.append('file',file)
		const config = {
			headers: {
				'content-type': 'multipart/form-data'
			}
		}
		this.setState({loading: true});
		return  post(url, formData, config).then(this.setState({loading: false, done: true}))
	}

	isLoading() {
		if (this.state.file === null) {
			return(
				<Button type="button" color="disable">Upload</Button>

				);
		} else {
			return(
				<Button type="submit" color="primary">Upload</Button>
				);
		}
	};

	isDone = () => {
		if(this.state.done) {
			this.setState({done: false, open: true})
		}
	};

	handleClose = () => {
		this.setState({ open: false });
		this.refesh();
	};

	refesh() {
		document.location.reload(true);
	};

	render() {
		let loading = this.isLoading();
		let done = this.isDone();
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
					{done}
				</CardContent>
			</Paper>
			<Dialog
				open={this.state.open}
				onClose={this.handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description">
				<DialogTitle id="alert-dialog-title">{"Upload completed."}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Your data successfully uploaded.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={this.handleClose} color="primary" autoFocus>
						Close
					</Button>
				</DialogActions>
			</Dialog>
			</div>
			);
	}
};

export default UploadFile;