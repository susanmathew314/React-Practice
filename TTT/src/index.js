import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component{
	
	render(){
		return (
			<div>
				<h1>Hello World!</h1>
				<p>This is a new React app! Start by editing the index.js ^_^ </p>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById("root"));