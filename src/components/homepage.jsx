import React, {Component} from 'react';
import Sidebar from './sidebar';
import Header from './header';
import Body from './body';
import Footer from './footer';

class Homepage extends Component {
	state = {};

	render () {
		return (
			<div className='container1'>
				<div className='container2'>
					<Sidebar />
					<div className='container3'>
						<Header />
						<Body />
					</div>
				</div>
				<Footer />
			</div>
			);
	};
};

export default Homepage;