import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class VoteItem extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			votes: 0,
		}
		this.onClick = this.onClick.bind(this)
	}
	onClick(){
		this.props.incVote(this.props.title,
			() => this.setState({votes: this.state.votes+1 })
		)
	}
	render(){
		return (
			<tr>
				<td>{this.state.votes}</td>
				<td>{this.props.title}</td>
				<td><button onClick={this.onClick}> + </button></td>
			</tr>
		)
	}
}

class VoteTable extends React.Component{
	constructor(props){
		super(props);
		let newState = {}
		this.props.items.forEach(
			(item)=>{
				newState[item] = 0;
			}
		)
		this.state = newState;
		this.incVote = this.incVote.bind(this);
	}
	incVote(title, cb){
		let newState = {};
		this.props.items.forEach(
			(item)=>{
				newState[item] = item === title ? this.state[item]+1 : this.state[item];
				cb();
			}
		);
		this.setState(newState);
	}
	render(){
		return(
			<table>
				{this.props.items
					.sort(
						(a,b)=> {
							return this.state[a] < this.state[b] ? 1 : this.state[a]===this.state[b] ? a>b : -1;
						}
					)
					.map(name => 
						<VoteItem 
							incVote={this.incVote} 
							title={name} 
							key={name}
						></VoteItem> 
					)
				}
			</table>
		)
	}
}

class App extends React.Component{
	render(){
		return (
			<div>
				<h1>VOTE Your JS Library!</h1>
				<VoteTable items={["React", "Vue","Angular", "Ember"]} />
				<h1>VOTE Your favorite Character!</h1>
				<VoteTable items={["Izuku", "Midoriya", "Incinerator", "Batman", "Superman", "All Might"]} />
			</div>
		);
	}
}
ReactDOM.render(<App />, document.getElementById("root"));