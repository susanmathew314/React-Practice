import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class VoteItem extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			votes: 0,
		}
	}
	render(){
		return (
			<tr>
				<td>{this.state.votes}</td>
				<td>{this.props.title}</td>
				<td><button onClick={() => this.setState({votes: this.state.votes+1 })}> + </button></td>
			</tr>
		)
	}
}

class VoteTable extends React.Component{
	render(){
		return(
			<table>
				{this.props.items.map( name => <VoteItem title={name} ></VoteItem> )}
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
			</div>
		);
	}
}
ReactDOM.render(<App />, document.getElementById("root"));