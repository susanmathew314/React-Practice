import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component{
	
	render(){
		return (
			<div>
				<h1>VOTE Your JS Library!</h1>
				<Vote />
			</div>
		);
	}
}

class Vote extends React.Component{
	selector(value){
		return(<button onClick={() => alert("you chose "+value)}> + </button>)
	}
	render(){
		
		
		return(
			<table>
				<tbody>
					<tr>
						<td>(#)</td>
						<td>React</td>
						<td>{this.selector("React")}</td>
					</tr>
				</tbody>
				<tr>
					<td>(#)</td>
					<td>Vue</td>
					<td>{this.selector("Vue")}</td>
				</tr>
				<tr>
					<td>(#)</td>
					<td>Angular</td>
					<td>{this.selector("Angular")}</td>
				</tr>
				<tr>
					<td>(#)</td>
					<td>Ember</td>
					<td>{this.selector("Ember")}</td>
				</tr>
			
			
			</table>
		)
		
	}
}



ReactDOM.render(<App />, document.getElementById("root"));