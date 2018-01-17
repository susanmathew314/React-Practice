import React from 'react';
export default class Router{
	constructor(outlet){
		this.outlet = outlet;
		window.onpopstate = ()=>{
			this.path = window.location.pathname;
			outlet.setState({path: this.path})
		}
		document.addEventListener('click', (e)=>{
			console.log("click");
			var href;
			if(e.target.tagName === 'A'){
				href = e.target.getAttribute('href');
				if(href !== this.path){	//should probably check if the route belongs to me first?
					e.preventDefault();
					this.setPath(href);
				}
			}
		});
	}
	getPath(){
		return this.path;
	}
	setPath(path){
		this.path = path;
		window.history.pushState(null,null,path);
		this.outlet.setState({path: this.path});
	}
}
export class RouterOutlet extends React.Component{
	constructor(props){
		super(props);
		this.router = new Router(this);
		this.state = {
			path: window.location.pathname,
		}
		this.routes = [
			{pathname: "/Javascript", component: Javascript},
			{pathname: "/Haskell", component: Haskell},
			{pathname: "/CoffeeScript", component: CoffeeScript},
		]
	}
	render(){
		var component = null;
		var element = null;
		for (let i = 0, l = this.routes.length; i !== l && !component; i++){
			if (this.routes[i].pathname == this.state.path)
				component = this.routes[i].component;
		}
		if (component)
			return React.createElement(component, {router: this.router}, null);
		return null;
	}
}
function Javascript(props){
	return(<p>
		A high-level, dynamic, untyped, and interpreted programing language.
	</p>);
}

function Haskell(props){
	return(
	<p>
		A standardized, general pourpose purely functional programing language, with non-strict sematics and strong static typing.
	</p>
	);
}

class CoffeeScript extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			timer: 5
		}
	}
	timer(secs){
		setTimeout(
			()=>{
				if (this.state.timer === 0)
					this.props.router.setPath("/Javascript");
				else
					this.setState({timer: this.state.timer-1});
			},1000);
	}
	render(){
		this.timer(this.state.timer);
		return(
			<p>
				CoffeeScript is a programming language that transcompiles to JavaScript, so we'll be redirecting back to Javascript in {this.state.timer}.
			</p>
		);
	}
}