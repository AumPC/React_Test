import React, {Component} from 'react';
import UploadFile from './uploadFile';

class Header extends Component {
	state = {};

	render () {
		return (
			<div className='header'>
				<p>Header</p>
				<UploadFile />
			</div>
			);
	};
};

export default Header;