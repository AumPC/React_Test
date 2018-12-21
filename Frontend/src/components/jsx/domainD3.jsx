import React, {Component} from 'react';
import axios, {post} from 'axios';
import Temp from "./temp";

class DomainD3 extends Component {
	state = {
		id: "temp_circle"
	  }
	
	  render() {
		return (
		  <div className="temp_circle">
			<Temp data={this.props.data} id={this.state.id}/>
		  </div>
		);
	  }
};

export default DomainD3;