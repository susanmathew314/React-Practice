import React from 'react';
import {
  BrowserRouter,
  Route,
  Link
} from 'react-router-dom';

import ReactDOM from 'react-dom';
import './index.css';

class Index extends React.Component{
	
	render(){
		return (
			<div>
				<h1>Hello World!</h1>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</div>
		);
	}
}

class App extends React.Component{
	render(){
		return (<Nav />)
	}
}
const Nav = () => {
	return (
	<nav>
		
	</nav>)
}
ReactDOM.render(<Index />, document.getElementById("root"));
