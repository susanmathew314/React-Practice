import React from 'react';
import './List.css';

export class ListForm extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			title: "",
			message: "",
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
		this.props.handleSubmit(this.state.title,
		()=>{
			this.setState({title: "", message: ""})
		},
		(message)=>{
			this.setState({message: message});
		}
		);
	}
	isValid(){
		return this.state.title === "";
	}
	render(){
		return (<form onSubmit={this.handleSubmit} >
			<input value={this.state.title} onChange={this.handleChange} type="text" name="title" id="list-form-title" placeholder="list title"/>
			<button type="submit" disabled={this.isValid()}>Create List</button>
			<small>{this.state.message}</small>
		</form>)
	}
}
export default class List extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			items: [
			],//{id:0, completed: true, text: "helloworld", editing: false}
			filter: "all",
			editing: -1,
		}
		this.nextId = this.state.items.length;
		this.onChangeCompleted = this.onChangeCompleted.bind(this);
		this.onSubmitNew = this.onSubmitNew.bind(this);
		this.onfilter = this.onfilter.bind(this);
		this.removeCompleted = this.removeCompleted.bind(this);
		this.removeItem = this.removeItem.bind(this);
		this.updateItemText = this.updateItemText.bind(this);
		this.handleDblClick = this.handleDblClick.bind(this);
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
	updateItemText(id, text){
		const items = this.state.items.slice();
		var item;
		for (let i = 0; i < items.length && !item; i++){
			if (items[i].id === id)
				item = items[i]
		}
		item.text = text;
		this.setState({items: items, editing: -1});
	}
	handleDblClick(id){
		this.setState({editing: id});
	}
	renderItem(item){
		if (this.state.editing === -1 || this.state.editing !== item.id){
			return (<ListItem handleDblClick={this.handleDblClick} removeItem={this.removeItem} onSubmitNew={this.onSubmitNew} onChangeCompleted={this.onChangeCompleted} key={item.id} id={item.id} completed={item.completed} text={item.text}/>)
		}
		else{
			return (<EditItem update={this.updateItemText} item={item}/>)
		}
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
							return this.renderItem(item);
					}
					else if (this.state.filter === "incomplete" || this.state.filter === "all")
						return this.renderItem(item);
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
			<form onDoubleClick={()=>{this.props.handleDblClick(this.props.id)}} onMouseLeave={()=>this.setState({hover: false})} onMouseEnter={()=>this.setState({hover: true})} className="listitem" action="javascript:void(0);">
				<input type="checkbox" name="status" checked={this.props.completed} onChange={()=> this.props.onChangeCompleted(this.props.id)}/>
				<label className={labelclasses.join(" ")} >{this.props.text}</label>
				<button className={deleteclasses.join(" ")} onClick={()=>this.props.removeItem(this.props.id)}>X</button>
			</form>
		)
	}
}

class EditItem extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			value: props.item.text,
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleUnFocus(){
		
	}
	handleChange(e){
		this.setState({value: e.target.value})
	}
	handleSubmit(e){
		e.preventDefault();
		this.props.update(this.props.item.id, this.state.value	)
	}
	render(){
		return (
			<form onBlur={this.handleSubmit} onSubmit={this.handleSubmit} className="edit-item-form">
				<input disabled type="checkbox" name="status" checked={this.props.item.completed}/>
				<input onChange={this.handleChange} type="text" name="text" value={this.state.value}/>
				<button type="submit" className="save-item-btn" >./</button>
			</form>
		)
	}
}