import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import List from './List.js';
class App extends React.Component{
	
	render(){
		return (
			<div>
				<div></div>
				<List title="todos"/>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById("root"));