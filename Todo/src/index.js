import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component{
	
	render(){
		return (
			<div>
				<h1>todos</h1>
				<List />
			</div>
		);
	}
}
class List extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			items: [
				{id: 3, completed: false, text: "delete item"},
				{id: 2, completed: false, text: "filter item"},
				{id: 1, completed: true, text: "add item"},
				{id: 0, completed: true, text: "helloworld"},
			],//{completed: true, text: "helloworld", editing: false}
			filter: "all",
		}
		this.nextId = this.state.items.length;
		this.onChangeCompleted = this.onChangeCompleted.bind(this);
		this.onSubmitNew = this.onSubmitNew.bind(this);
		this.onfilter = this.onfilter.bind(this);
	}
	onChangeCompleted(id){
		var item = this.state.items.filter((item)=>item.id===id)[0];
		console.log(item);
		item.completed = !item.completed;
		const newList = this.state.items.sort( (a,b) => a.completed ===true && a.completed === b.completed ? 0:  a.completed === true? 1 : b.completed === true? -1 : a.id < b.id);
		this.setState({items: newList});
	}
	onSubmitNew(text){
		var newItem = {id: this.nextId++, completed: false, text: text}
		const items = this.state.items.slice();
		items.unshift(newItem);
		this.setState({items: items});
	}
	onfilter(filter){
		this.setState({filter: filter});
	}
	render(){
		
		return(
		<div className="list-container">
			<ListInput onSubmitNew={this.onSubmitNew } />
			{this.state.items.map((item)=>
				<ListItem onSubmitNew={this.onSubmitNew} onChangeCompleted={this.onChangeCompleted} key={item.id} id={item.id} completed={item.completed} text={item.text}/>
			)}
			<div className="list-footer">
				<p className="uncompleted-count">{this.state.items.filter((i)=>!i.completed).length + " items left"}</p>
				<div>
				<button className={this.state.filter === "all" ? "selected" : "unselected"}
					onClick={()=>{this.onfilter("all")}}
					>all</button>
				<button className={this.state.filter === "completed" ? "selected" : "unselected"}
					onClick={()=>{this.onfilter("completed")}}
					>completed</button>
				<button className={this.state.filter === "incomplete" ? "selected" : "unselected"}
					onClick={()=>{this.onfilter("incomplete")}}
					>incomplete</button>
				</div>
				<p>{this.state.items.filter((i)=>i.completed).length != 0? "remove completed": ""}</p>
			</div>
		</div>
		)
	}
}
class ListInput extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			value:"",
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	handleChange(e){
		this.setState({value: e.target.value});
	}
	handleSubmit(e){
		e.preventDefault();
		const text = this.state.value;
		this.setState({value:""})
		if (text!== "")
			this.props.onSubmitNew(text);
	}
	render(){
		return (
			<form className="newitem" action="javascript:void(0);" onSubmit={this.handleSubmit}>
				<button type="submit">v</button>
				<input onChange={this.handleChange}type="text" value={this.state.value} name="newitem" placeholder="add a new item"/>
			</form>
		)
	}
}
class ListItem extends React.Component{
	
	render(){
		var classes = ["item"];
		if (this.props.completed)
			classes.push("completed");
		
		return (
			<form>
				<input type="checkbox" name="status" checked={this.props.completed} onChange={()=> this.props.onChangeCompleted(this.props.id)}/>
				<label className={classes.join(" ")} >{this.props.text}</label>
			</form>
		)
	}
}
class EditItem extends React.Component{
	
}
ReactDOM.render(<App />, document.getElementById("root"));