import React, {Component} from 'react';

class Sidebar extends Component {
	state = {};

	render () {
		return (
			<div className='sidebar'>
				<a className='bar-item head'>Sidebar</a>
				<a href='#' className='bar-item children'>Link 1</a>
				<a href='#' className='bar-item children'>Link 2</a>
				<a href='#' className='bar-item children'>Link 3</a>
			</div>
			);
	};
};

export default Sidebar;