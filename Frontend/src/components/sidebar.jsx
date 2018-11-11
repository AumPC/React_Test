import React, {Component} from 'react';

class Sidebar extends Component {
	state = {
		
	};

	

	render () {
		return (
			<div className='sidebar'>
				<div className='bar-item head'>{this.props.nowPage}</div>
				<div className='line' />
				{this.props.buttons.map(item => 
					<div
						onClick={(e) => this.props.handleItems(item)}
						className='bar-item children'
						key={item}>
						{item}
					</div>)}
			</div>
			);
	};
};

export default Sidebar;