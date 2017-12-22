import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

class App extends React.Component{
	constructor(props){
		super(props);
		this.state={
			size: 1,
		}
	}
	
	render(){
		return (
			<div>
				<form> 
					<label>Select a Size </label>
					<input type="number" placeholder="1" min="1" step="1" onInput={
						(e)=>{
								this.setState({size: (e.target.value) || 1});
							}
						} 
					/> 
				</form>
				<Board size={""+this.state.size}></Board>
			</div>
		);
	}
}
class Board extends React.Component{
	renderRow(num) {
		return (
			<Row key={num} size={this.props.size} startColor={this.props.size%2 === num%2 ? "red" : "black"} />
		)
	}
	render() {
		return (
			<div>
				{[...Array(parseInt(this.props.size)).keys()].map( i=> this.renderRow(i) )}
			</div>
		);
	}
}
class Row extends React.Component{
	render(){
		console.log("Row Props", this.props)
		let nextColor = this.props.startColor;
		return (
			<div className="row">
				{[...Array(parseInt(this.props.size)).keys()].map(
					i=>{
						if (nextColor === "red"){
							nextColor = "black";
							return (<Square key={i} color="red" />);
						}
						else{
							nextColor = "red";
							return (<Square key={i} color="black" />);
						}
					}
				)}
			</div>
		)
	}
}
class Square extends React.Component{
	render() {
		return (<div className={"square "+ this.props.color} ></div>);
	}
}

ReactDOM.render(<App />, document.getElementById("root"));

registerServiceWorker();
