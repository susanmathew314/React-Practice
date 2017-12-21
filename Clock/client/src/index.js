import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

//need to implement: AM/PM color change, 'numbers'


class Clock extends React.Component {
	renderHour(h){
		h = h <= 12 ? h : h-12;
		var styles = {
			borderColor:'hsl(' + 360/12*h + ',100%,50%)',
				
		}
		return (
			
			<div style={styles} className="hour"> </div>
		)
	}
	renderMin(m){
		var styles = {
			borderColor:'hsl(' + 360/60*m + ',100%,50%)',
				
		}
		return (<div style={styles} className="min"> </div>);
	}
	renderSec(s){
		var styles = {
			borderColor:'hsl(' + 360/60*s + ',100%,50%)',
				
		}
		return (<div style={styles} className="sec"> </div>);
	}
	render() {
		const time = new Date();
		console.log(time);
		return (
			<div className="clock">
				{this.renderHour(time.getHours())}
				{ this.renderMin(time.getMinutes())}
				{ this.renderSec(time.getSeconds())}
				<p className="output">{time.toLocaleTimeString()}</p>
			</div>
			
		)
	}
}


setInterval(()=>ReactDOM.render(<Clock />,document.getElementById("app")),1);




registerServiceWorker();
