import React, {Component} from 'react';
import axios, {post} from 'axios';
import Temp from "./temp";

class DomainD3 extends Component {
	state = {
		data: {
			"name": "thoughts",
			"children": [
			  {
				"name": "Computer thinking pioneers",
				"children": [
				  {
					"name": "Alan Kay",
					"size": 1
				  },
				  {
					"name": "Media Lab folks",
					"size": 1
				  }
				]
			  },
			  {
				"name": "AI",
				"children": [
				  {
					"name": "Alan Turing",
					"size": 1
				  },
				  {
					"name": "Others",
					"size": 10
				  }
				]
			  },
			  {
				"name": "Learning and computers",
				"children": [
				  {
					"name": "Seymour Papert",
					"size": 1
				  },
				  {
					"name": "\"Why education is so difficult and contentious\"",
					"size": 1
				  },
				  {
					"name": "Others",
					"size": 1
				  }
				]
			  },
			  {
				"name": "UX Pioneers",
				"children": [
				  {
					"name": "Bill Buxton",
					"size": 1
				  },
				  {
					"name": "Don Norman",
					"size": 1
				  },
				  {
					"name": "Others",
					"size": 10
				  }
				]
			  },
			  {
				"name": "X-Ray thinkers",
				"children": [
				  {
					"name": "Bret Victor",
					"size": 1
				  },
				  {
					"name": "Kathy Sierra",
					"size": 1
				  }
				]
			  },
			  {
				"name": "Media Lab thinkers (modern)",
				"children": [
				  {
					"name": "Joi Ito",
					"size": 1
				  },
				  {
					"name": "Design as participation",
					"size": 1
				  },
				  {
					"name": "Others",
					"size": 10
				  }
				]
			  },
			  {
				"name": "Design-centric voices",
				"children": [
				  {
					"name": "MTIV",
					"size": 1
				  },
				  {
					"name": "IDEO people",
					"size": 1
				  },
				  {
					"name": "Other",
					"size": 10
				  }
				]
			  },
			  {
				"name": "Sciences + Philosophy",
				"children": [
				  {
					"name": "History of Scientific thought",
					"size": 1
				  },
				  {
					"name": "Philosophy",
					"size": 1
				  },
				  {
					"name": "Cognitive Philosophy",
					"size": 1
				  },
				  {
					"name": "Educational approaches",
					"size": 1
				  }
				]
			  },
			  {
				"name": "Cool people and offices",
				"children": [
				  {
					"name": "NYC collectives",
					"size": 10
				  },
				  {
					"name": "Processing foundation",
					"size": 1
				  },
				  {
					"name": "OCR",
					"size": 1
				  },
				  {
					"name": "SFPC",
					"size": 1
				  },
				  {
					"name": "Golan Levin's group",
					"size": 1
				  },
				  {
					"name": "Rafael Rosendal",
					"size": 1
				  },
				  {
					"name": "HOLO team",
					"size": 1
				  },
				  {
					"name": "Others",
					"size": 1
				  }
				]
			  },
			  {
				"name": "Eastern philosophies that apply to process",
				"children": [
				  {
					"name": "shu-ha-ri",
					"size": 1
				  },
				  {
					"name": "rinsho",
					"size": 1
				  }
				]
			  },
			  {
				"name": "American-style wisdom",
				"children": [
				  {
					"name": "TED talks",
					"size": 1
				  },
				  {
					"name": "podcasts",
					"size": 1
				  }
				]
			  }
			]
		  },
		id: "temp_circle"
	  }
	
	  render() {
		return (
		  <div className="temp_circle">
			<Temp data={this.state.data} id={this.state.id}/>
		  </div>
		);
	  }
};

export default DomainD3;