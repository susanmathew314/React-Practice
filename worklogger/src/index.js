import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component{
	
	render(){
		return (
			<div>
				<h1>Work Logger</h1>
				<Logger />
			</div>
		);
	}
}
class Logger extends React.Component{
	constructor(props){
		super(props)
		this.state={
			personal: [],
			work: [],
		}
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	handleSubmit(item,cb){
		let array = this.state[item.category].slice();
		array.push({description: item.description, mins: parseInt(item.mins)});
		this.setState({[item.category]:array},cb);
	}
	render(){
		return (
		<div>
			<LoggerForm handleSubmit={this.handleSubmit}/>
			<LoggerOut title="Personal" items={this.state.personal}/>
			<LoggerOut title="Work" items={this.state.work}/>
		</div>);
	}
}
function LoggerOut(props){
	console.log(props)
	let mins = 0;
	for (let i = 0; i< props.items.length; i++){
		mins+= props.items[i].mins;
	}
	let hours = parseInt(mins/60);
	mins = mins%60;
	
	const items = props.items.sort((a,b)=>a.mins<b.mins);
	return(
		<div>
			<h2>{props.title}</h2>
			<p>Total time: {hours}:{mins}</p>
			{items.map((item,id)=> <p key={id}><span className="time">{parseInt(item.mins/60)}:{item.mins%60}</span> {item.description}</p>)}
		</div>
	);
}
class LoggerForm extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			category: "personal",
			description: "",
			mins: 0,
			categoryErrors: "",
			descErrors: "",
			minErrors: "",
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.changeCategory = this.changeCategory.bind(this);
		this.changeDescription = this.changeDescription.bind(this);
		this.changeMins = this.changeMins.bind(this);
		this.isInvalid = this.isInvalid.bind(this);
		this.checkAll = this.checkAll.bind(this);
		this.checkCategories = this.checkCategories.bind(this);
		this.checkDesc = this.checkDesc.bind(this);
		this.checkMins = this.checkMins.bind(this);
	}
	handleSubmit(e){
		e.preventDefault();
		this.props.handleSubmit(this.state, 
		()=>{
			this.setState({	category: "personal", description: "", mins: 0})
		});
	}
	changeCategory(e){
		let errors = this.state.categoryErrors;
		let category = e.target.value;
		if (category !== "personal" && category !== "work")
			errors = "not a valid category";
		this.setState({category: category, categoryErrors: errors});
	}
	changeDescription(e){
		let description = e.target.value;
		this.setState({description: description});
	}
	changeMins(e){
		this.setState({mins: e.target.value})
	}
	isInvalid(){
		if (this.state.minErrors || this.state.descErrors || this.state.categoryErrors)
			return true;
		return false;
	}
	checkCategories(){
		let categoryErrors = "";
		let category = this.state.category;
		if (category !== "personal" && category !== "work")
			categoryErrors = "not a valid category";
		this.setState({categoryErrors:categoryErrors});
	}
	checkDesc(){
		let descErrors = "";
		let description = this.state.description;
		if (description.length < 5 || /^\s+$/.test(description))
			descErrors = "Description must be at least 5 characters";
		this.setState({descErrors:descErrors});
	}
	checkMins(){
		let minErrors = "";
		let mins = this.state.mins;
		if (mins < 0 || mins > 240)
			minErrors = "Minutes must be between 0 and 240"
		this.setState({minErrors:minErrors});
	}
	checkAll(){
		this.checkDesc();
		this.checkMins();
		this.checkCategories();
	}
	render(){
		return (
			<form onSubmit={this.handleSubmit}>
				<label>Project</label>
				<select name="project" 
				  value={this.state.category} 
				  onChange={this.changeCategory}
				  onBlur={this.checkCategories}
				>
					<option value="personal">Personal</option>
					<option value="work">Work</option>
				</select>
				<small>{this.state.categoryErrors}</small>
				<br/>
				
				<label>Description</label>
				<input 
				  type="text" 
				  name="description" 
				  value={this.state.description}
				  onChange={this.changeDescription}
				  onBlur={this.checkDesc}
				/>
				<small>{this.state.descErrors}</small>
				<br/>
				
				<label>Minutes</label>
				<input 
				  type="number" 
				  name="mins" 
				  value={this.state.mins}
				  onChange={this.changeMins}
				  onBlur={this.checkMins}
				  min="0" 
				  max="240" 
				  step="1" 
				/>
				<small>{this.state.minErrors}</small>
				<br/>
				
				<button disabled={this.isInvalid()} type="submit">Add</button>
			</form>
		);
	}
	
}
ReactDOM.render(<App />, document.getElementById("root"));