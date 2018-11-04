import React, {Component} from 'react';
import Simplearchart from './simpleBarchart';
import UploadFile from './uploadFile';

class Body extends Component {
	state = {};

	render () {
		return (
			<div className='body-container'>
				<Simplearchart />
				<UploadFile />
			</div>
			);
	};
};

export default Body;