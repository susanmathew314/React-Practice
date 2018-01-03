import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component{
	
	render(){
		return (
			<div>
				<h1>TicTacToe!</h1>
				<Board />
			</div>
		);
	}
}
class Board extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			0:0,	1:0,	2:0,
			3:0,	4:0,	5:0,
			6:0,	7:0,	8:0,
			next: 1, winner: false,
		}
		this.updateSquare = this.updateSquare.bind(this)
		this.getPlayer = this.getPlayer.bind(this)
		this.resetGame = this.resetGame.bind(this)
	}
	updateSquare(location, cb){
		if ( !this.state.winner && this.state[location] === 0) {
			this.setState({ [location] : this.state.next, next: -1 * this.state.next}
			,()=>{
				cb();
				if ( Math.abs(this.state[0]+this.state[1]+this.state[2]) === 3 ||
					Math.abs(this.state[3]+this.state[4]+this.state[5]) === 3 ||
					Math.abs(this.state[6]+this.state[7]+this.state[8]) === 3 ||
					Math.abs(this.state[0]+this.state[3]+this.state[6]) === 3 ||
					Math.abs(this.state[1]+this.state[4]+this.state[7]) === 3 ||
					Math.abs(this.state[2]+this.state[5]+this.state[8]) === 3 ||
					Math.abs(this.state[2]+this.state[4]+this.state[6]) === 3 ||
					Math.abs(this.state[0]+this.state[4]+this.state[8]) === 3)
					{
						setTimeout(
							()=>{
								alert("Player " + this.playerIcons[-1*this.state.next+1] + " Wins!");
							},100
						)
						this.setState({winner: this.state.next *-1})
					}
					for(let i = 0; i < 9; i++){
						if (this.state[i] === 0)
							return;
					}
					setTimeout(
						()=>{
							alert("Draw! No Winner!");
						},100
					)
					this.setState({winner: 0});
				}
			);
				
		}
	}
	resetGame(){
		this.setState({
			0:0,	1:0,	2:0,
			3:0,	4:0,	5:0,
			6:0,	7:0,	8:0,
			next: 1, winner: false,
		})
	}
	getPlayer(){
		return this.state.next;
	}
	playerIcons=["0"," ","X"]
	render(){
		return (<div className="tttboard" >
			{[...new Array(3).keys()]
				.map( i =>
					
					<div className="row" key={i}>
					{[...new Array(3).keys()]
						.map( j =>
						<Square value={this.playerIcons[this.state[i*3+j]+1]} location={i*3+j} getPlayer={this.getPlayer} updateSquare={this.updateSquare}/>
					)}
					</div>
				)
			}
		<p>It is {this.playerIcons[this.state.next+1]}'s turn </p>
		<button onClick={this.resetGame}>Reset Game</button>
		</div>)
	}
}
class Square extends React.Component{
	constructor(props){
		super(props);
		this.onClick = this.onClick.bind(this)
	}
	onClick (){
		this.props.updateSquare(this.props.location,
			()=>{
				this.setState({value: this.props.getPlayer()})
			}
		)
	}

	render(){
		return (<div 
			className="square"
			onClick={this.onClick}
			>{this.props.value}
		</div>)
	}
}
ReactDOM.render(<App />, document.getElementById("root"));