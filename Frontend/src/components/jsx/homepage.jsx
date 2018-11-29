import React, {Component} from 'react';
import Sidebar from './sidebar';
import Header from './header';
import Body from './body';
import EgressIngressPage from './egressIngressPage';
import Footer from './footer';

class Homepage extends Component {
	state = {
		nowPage: 'Overview',
		buttons: [
				'Overview',
				'Ingress/Egress']
	};

	componentDidUpdate(prevProps) {
		if (this.state.nowPage !== prevProps) {
			this.renderContent(this.state.nowPage);
		}
	}

	handleItems = (inp) => {
		this.setState({nowPage: inp});
	};

	renderContent = (inp) => {
		if (inp === 'Overview') {
			return (
				<Body />
				);
		} else {
			return (
				<EgressIngressPage />
				);
		}
	};

	render () {
		return (
			<div className='container1'>
				<div className='container2'>
					<Sidebar 
						nowPage={this.state.nowPage}
						buttons={this.state.buttons}
						handleItems={this.handleItems} />
					<div className='container3'>
						<Header />
						{this.renderContent(this.state.nowPage)}
					</div>
				</div>
				<Footer />
			</div>
			);
	};
};

export default Homepage;