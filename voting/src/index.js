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
		var alert = ()=>alert("you chose "+value)
		return(<button onclick={alert}> + </button>)
	}
	render(){
		
		
		return(
			<table>
				<tbody>
					<tr>
						<td>(#)</td>
						<td>React</td>
						<td>{this.selector("react")}</td>
					</tr>
				</tbody>
				<tr>
					<td>(#)</td>
					<td>Vue</td>
					<td><button> + </button></td>
				</tr>
				<tr>
					<td>(#)</td>
					<td>Angular</td>
					<td><button> + </button></td>
				</tr>
				<tr>
					<td>(#)</td>
					<td>Ember</td>
					<td><button> + </button></td>
				</tr>
			
			
			</table>
		)
		
	}
}



ReactDOM.render(<App />, document.getElementById("root"));