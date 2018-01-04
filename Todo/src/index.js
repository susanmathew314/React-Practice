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
				{id: 2, completed: false, text: "implement input"},
				{id: 3, completed: false, text: "implement filters"},
				{id: 4, completed: false, text: "implement edit"},
				{id: 5, completed: false, text: "implement delete"},
				{id: 1, completed: true, text: "helloworld"},
			],//{completed: true, text: "helloworld", editing: false}
			filter: null,
		}
		this.nextId = 5;
		this.onChangeCompleted = this.onChangeCompleted.bind(this);
	}
	onChangeCompleted(id){
		var item = this.state.items.filter((item)=>item.id===id)[0];
		console.log(item);
		item.completed = !item.completed;
		const completed = this.state.items.filter((item)=>item.completed)//.sort((a,b)=>a.id > b.id)
		const uncompleted = this.state.items.filter((item)=>!item.completed).sort((a,b)=>a.id > b.id)
		var newList = uncompleted.concat(completed);
		this.setState({items: newList});
	}
	render(){
		
		return(
		<div className="list-container">
			<ListInput />
			{this.state.items.map((item)=>
				<ListItem onChangeCompleted={this.onChangeCompleted} key={item.id} id={item.id} completed={item.completed} text={item.text}/>
			)}
		</div>
		)
	}
}
function ListInput(props){
	return (
		<form className="newitem" action="javascript:void(0);">
			<input type="text" name="newitem" placeholder="add a new item"/>
		</form>
	)
	
}
function ListItem(props){
	var classes = ["item"];
	if (props.completed)
		classes.push("completed");
	
	return (
		<form>
			<input type="checkbox" name="status" checked={props.completed} onChange={()=> props.onChangeCompleted(props.id)}/>
			<label className={classes.join(" ")} >{props.text}</label>
		</form>
	)
}
class EditItem extends React.Component{
	
}
ReactDOM.render(<App />, document.getElementById("root"));