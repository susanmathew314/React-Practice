import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { RouterOutlet } from './router.js';
import { Router } from './router.js';
window.onpopstate = (e)=>{
	alert("hi");
}
class App extends React.Component{
	constructor(props){
		super(props)
		
	}
	linkto(i){
		return (<a href={"/"+i}>{i}</a>);
	}
	render(){
		return (
			<div>
				<ul>
				{["Javascript", "Haskell","CoffeeScript"].map((i)=> <li key={i}>{this.linkto(i)}</li>)}
				</ul>
				<hr/>
				<RouterOutlet />
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById("root"));