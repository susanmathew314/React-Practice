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
