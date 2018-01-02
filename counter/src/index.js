import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class CounterApp extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			counters: 1,
		}
	}
	addCounter(){
		return ;
	}
	render(){
		return (
			<div>
				<AddCounter onclick={()=> this.setState({counters: this.state.counters +1})}/>
				{[...new Array(this.state.counters)].map((i)=> <Counter />)}
			</div>
		);
	}
}

class AddCounter extends React.Component{
	
	render(){
		return (<button onClick={this.props.onclick} >Add Counter</button>)
	}
}

class Counter extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			count: 0,
		}
	}
	render() {
		return (
			<div className="counter">
				<h1>{this.state.count}</h1>
				<button onClick={()=> this.setState({count: this.state.count+1})}>Increment</button>
				<button onClick={()=>this.setState({count: this.state.count-1})}>Decrement</button>
			</div>
		)
	}
	
}

ReactDOM.render(<CounterApp />, document.getElementById("root"));