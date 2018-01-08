import React from 'react';
import './List.css';

export class ListForm extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			title: "",
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.isValid = this.isValid.bind(this);
			
	}
	handleChange(e){
		this.setState({title: e.target.value});
	}
	handleSubmit(e){
		e.preventDefault();
		this.props.handleSubmit(this.state,
		()=>{
			this.setState({title: ""})
		}
		);
	}
	isValid(){
		return this.state.title !== "";
	}
	render(){
		return (<form onSubmit={this.handleSubmit} >
			<input value={this.state.title} onChange={this.handleChange} type="text" name="title" id="list-form-title" placeholder="list title"/>
			<button type="submit" disabled={this.isValid}>Create List</button>
		</form>)
	}
}
export default class List extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			items: [
			],//{completed: true, text: "helloworld", editing: false}
			filter: "all",
		}
		this.nextId = this.state.items.length;
		this.onChangeCompleted = this.onChangeCompleted.bind(this);
		this.onSubmitNew = this.onSubmitNew.bind(this);
		this.onfilter = this.onfilter.bind(this);
		this.removeCompleted = this.removeCompleted.bind(this);
		this.removeItem = this.removeItem.bind(this);
	}
	onChangeCompleted(id){
		var item = this.state.items.filter((item)=>item.id===id)[0];
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
	removeCompleted(){
		const filtereditems = this.state.items.filter((item)=>!item.completed);
		this.setState({items: filtereditems});
	}
	removeItem(id){
		const filtereditems = this.state.items.filter((item)=>item.id !== id);
		this.setState({items: filtereditems});
	}
	render(){
		
		return(
		<div id={this.props.title}>
			<h1>{this.props.title}</h1>
			<div className="list-container">
				<ListInput onSubmitNew={this.onSubmitNew } />
				{this.state.items.map((item)=>{
					if (item.completed === true){
						if (this.state.filter === "completed" || this.state.filter === "all")
							return (<ListItem removeItem={this.removeItem} onSubmitNew={this.onSubmitNew} onChangeCompleted={this.onChangeCompleted} key={item.id} id={item.id} completed={item.completed} text={item.text}/>)
						return null;
					}
					else if (this.state.filter === "incomplete" || this.state.filter === "all")
						return(<ListItem removeItem={this.removeItem} onSubmitNew={this.onSubmitNew} onChangeCompleted={this.onChangeCompleted} key={item.id} id={item.id} completed={item.completed} text={item.text}/>)
					return null;
					}
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
					<p onClick={this.removeCompleted} className={this.state.items.filter((i)=>i.completed).length !== 0? "remove-all": "remove-all hidden"}>remove completed</p>
				</div>
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
	constructor(props){
		super(props)
		this.state = {
			hover: false,
		}
	}
	onHover(){
		
	}
	render(){
		var labelclasses = ["item"];
		if (this.props.completed)
			labelclasses.push("completed");
		var deleteclasses = ["deleteitem"];
		if (!this.state.hover)
			deleteclasses.push("hidden");
		return (
			<form onMouseLeave={()=>this.setState({hover: false})} onMouseEnter={()=>this.setState({hover: true})} className="listitem" action="javascript:void(0);">
				<input type="checkbox" name="status" checked={this.props.completed} onChange={()=> this.props.onChangeCompleted(this.props.id)}/>
				<label className={labelclasses.join(" ")} >{this.props.text}</label>
				<button hidden="true" className={deleteclasses.join(" ")} onClick={()=>this.props.removeItem(this.props.id)}>X</button>
			</form>
		)
	}
}
class EditItem extends React.Component{
	
}