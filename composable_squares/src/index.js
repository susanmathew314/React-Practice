import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

class Square extends React.Component{
	
	render(){
		const style = {
			backgroundColor: this.props.background,
			color: this.props.color,
		}
		return (<div className="square" style={style}><h1>{this.props.color} on {this.props.background}</h1></div>);
	}
	
}

ReactDOM.render(
	<div>
		<Square color="white" background="blue"/>
		<Square color="blue" background="red"/>
		<Square color="green" background="pink"/>
	</div>, 
	document.getElementById("root")
);

registerServiceWorker();
