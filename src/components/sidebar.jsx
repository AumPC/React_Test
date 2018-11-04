import React, {Component} from 'react';

class Sidebar extends Component {
	state = {
		nowPage: 'Overview',
		buttons: [
				'Overview',
				'Ingress/Egress']
	};

	handleItems = (inp) => {
		this.setState({nowPage: inp});
	};

	render () {
		return (
			<div className='sidebar'>
				<div className='bar-item head'>{this.state.nowPage}</div>
				<div className='line' />
				{this.state.buttons.map(item => 
					<div	onClick={(e) => this.handleItems(item)}
						className='bar-item children'
						key={item}>
						{item}
					</div>)}
			</div>
			);
	};
};

export default Sidebar;