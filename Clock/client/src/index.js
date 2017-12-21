import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

class Clock extends React.Component {
	renderHour(h){
		h = h <= 12 ? h : h-12;
		var styles = {
			borderColor:'hsl(' + 360/12*h + ',100%,65%)',
		}
		return (<div style={styles} className="hour"> </div>);
	}
	renderMin(m){
		var styles = {
			borderColor:'hsl(' + 360/60*m + ',100%,65%)',
		}
		return (<div className="min"><div style={styles}> </div></div>);
	}
	renderSec(s){
		var styles = {
			borderColor:'hsl(' + 360/60*s + ',100%,65%)',
		}
		return (<div  className="sec"><div style={styles}> </div></div>);
	}
	renderNumber(i){
		var styles = {
			borderColor:'hsl(' + 360/12*i + ',100%,65%)',
		}
		return(<div className={"num n"+i}><div style={styles}>{i}</div></div>)
	}
	render() {
		const time = new Date();
		return (
			<div>
				<h1>Rainbow Clock!</h1>
				<div className="clock">
					{this.renderHour(time.getHours())}
					{ this.renderMin(time.getMinutes())}
					{ this.renderSec(time.getSeconds())}
					{[...Array(12).keys()].map(i=>this.renderNumber(++i))}
					<p className="output">{time.toLocaleTimeString()}</p>
				</div>
			</div>
		)
	}
}


setInterval(()=>ReactDOM.render(<Clock />,document.getElementById("app")),1);



registerServiceWorker();
