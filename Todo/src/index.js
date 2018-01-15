import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import List from './List.js';
import { ListForm } from './List.js';
class App extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			lists: ["todos"],
		}
		this.addList = this.addList.bind(this);
	}
	addList(title, cb,eb){
		//needs to take error back too. list title must be unique
		const lists = this.state.lists.slice();
		if(lists.indexOf(title) !== -1){	//list already exists
			eb("new lists must have a unique title")
		}
		else if(title === "" || /^\s+$/.test(title)){
			eb("list title can not be empty");
		}
		else{
			lists.push(title)
			this.setState({lists: lists},cb);
		}
	}
	render(){
		return (
			<div id="main">
				<SideBar addList={this.addList} lists={this.state.lists}/>
				<div id="lists">
					{this.state.lists.map((title)=><List title={title} key={title}/>)}
				</div>
			</div>
		);
	}
}
class SideBar extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			hover: false,
			header: "L",
		}
		this.mouseover = this.mouseover.bind(this)
		this.mouseleave = this.mouseleave.bind(this)
	}
	
	mouseover(){
		this.setState({hover:true},
			()=>{
			setTimeout(()=>{
				this.setState({header: "List App"});
			},100);
			}
		);
	}
	mouseleave(){
		this.setState({hover:false},
			()=>{
			setTimeout(()=>{
				this.setState({header: "L"});
			},100);
			}
		);
	}
	renderMenu(){
		if (this.state.hover)
			return(
				<div className="menu">
					<h2>Add a List</h2>
					<ListForm handleSubmit={this.props.addList}/>
					<h2>Your Lists</h2>
					<ul>
						{this.props.lists.map((title)=> <li><a href={"#"+title}>{title}</a> x</li>  )}
					</ul>
				</div>
			);
		else
			return (<div />)
	}
	render(){
		return (
		<div id="sidebar" onMouseOver={this.mouseover} onMouseLeave={this.mouseleave} className={this.state.hover===true ? "open" : "closed"}>
			<h1>{this.state.header}</h1>
			{this.renderMenu()}
		</div>
		)
	}
}
ReactDOM.render(<App />, document.getElementById("root"));