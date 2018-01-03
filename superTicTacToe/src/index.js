import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component{
	render(){
		return (
			<div className="GameContainer">
				<div className="Game">
				<h1>Super TicTacToe</h1>
					<Game />
				</div>
				<div className="Rules">
					<h2>Rules</h2>
					<ul>
						<li>Super TicTacToe is split up into 9 inner TicTacToe Boards with 9 squares in each board</li>
						<li>When you win an inner board, that board becomes yours, and turns your color</li>
						<li>Player X is Red</li>
						<li>Player O is Green</li>
					</ul>
					<ul>
						<li>X makes the first move.</li>
						<li>The first move can be made in any square in any of the inner boards</li>
						<li>After the first move, the square that the last player played in determines which board can be played in next</li>
						<li>The exception to this rule is if that board is already full. then the next play can be played anywhere</li>
						<li>Valid inner boards are highlighted in Gold</li>
					</ul>
					<ul>
						<li>The game is won when a line is made in the outer board</li>
					</ul>
				</div>
			</div>
		);
	}
}
class Game extends React.Component{
		constructor(props){
		super(props);
		this.state = {
			0:{
				0:0,	1:0,	2:0,
				3:0,	4:0,	5:0,
				6:0,	7:0,	8:0,
				winner: null,
			},
			1:{
				0:0,	1:0,	2:0,
				3:0,	4:0,	5:0,
				6:0,	7:0,	8:0,
				winner: null,
			},
			2:{
				0:0,	1:0,	2:0,
				3:0,	4:0,	5:0,
				6:0,	7:0,	8:0,
				winner: null,
			},
			3:{
				0:0,	1:0,	2:0,
				3:0,	4:0,	5:0,
				6:0,	7:0,	8:0,
				winner: null,
			},
			4:{
				0:0,	1:0,	2:0,
				3:0,	4:0,	5:0,
				6:0,	7:0,	8:0,
				winner: null,
			},
			5:{
				0:0,	1:0,	2:0,
				3:0,	4:0,	5:0,
				6:0,	7:0,	8:0,
				winner: null,
			},
			6:{
				0:0,	1:0,	2:0,
				3:0,	4:0,	5:0,
				6:0,	7:0,	8:0,
				winner: null,
			},
			7:{
				0:0,	1:0,	2:0,
				3:0,	4:0,	5:0,
				6:0,	7:0,	8:0,
				winner: null,
			},
			8:{
				0:0,	1:0,	2:0,
				3:0,	4:0,	5:0,
				6:0,	7:0,	8:0,
				winner: null,
			},
			player: 1,
			lastLoc: null,
			nextLoc: null,
		}
		this.updateState = this.updateState.bind(this)
		this.resetGame = this.resetGame.bind(this)
		this.validLoc = this.validLoc.bind(this)
	}
	resetGame(){
		this.setState({
			0:{
				0:0,	1:0,	2:0,
				3:0,	4:0,	5:0,
				6:0,	7:0,	8:0,
				winner: null,
			},
			1:{
				0:0,	1:0,	2:0,
				3:0,	4:0,	5:0,
				6:0,	7:0,	8:0,
				winner: null,
			},
			2:{
				0:0,	1:0,	2:0,
				3:0,	4:0,	5:0,
				6:0,	7:0,	8:0,
				winner: null,
			},
			3:{
				0:0,	1:0,	2:0,
				3:0,	4:0,	5:0,
				6:0,	7:0,	8:0,
				winner: null,
			},
			4:{
				0:0,	1:0,	2:0,
				3:0,	4:0,	5:0,
				6:0,	7:0,	8:0,
				winner: null,
			},
			5:{
				0:0,	1:0,	2:0,
				3:0,	4:0,	5:0,
				6:0,	7:0,	8:0,
				winner: null,
			},
			6:{
				0:0,	1:0,	2:0,
				3:0,	4:0,	5:0,
				6:0,	7:0,	8:0,
				winner: null,
			},
			7:{
				0:0,	1:0,	2:0,
				3:0,	4:0,	5:0,
				6:0,	7:0,	8:0,
				winner: null,
			},
			8:{
				0:0,	1:0,	2:0,
				3:0,	4:0,	5:0,
				6:0,	7:0,	8:0,
				winner: null,
			},
			player: 1,
			lastLoc: null,
			nextLoc: null,
		})
	}
	calculateWinner(){
		console.log("calculating")
		const lines= [
			[0,1,2],
			[3,4,5],
			[6,7,8],
			
			[0,3,6],
			[1,4,7],
			[2,5,8],
			
			[0,4,8],
			[2,4,6],
		];
		const loc = this.state.lastLoc;
		const innerBoard = this.state[loc];
		let winner = null;
		for(let i = 0; i < lines.length && winner==null ; i++){
			let v = innerBoard[lines[i][0]] + innerBoard[lines[i][1]] + innerBoard[lines[i][2]]
			if (Math.abs(v)===3){
				winner = Math.sign(v);
			}
		}
		if (winner != null){
			let newstate = this.state[loc];
			newstate.winner = winner;
			this.setState({[loc]:newstate},
				()=>{
					for(let i = 0; i < lines.length; i++){
						let v = this.state[lines[i][0]].winner + this.state[lines[i][1]].winner + this.state[lines[i][2]].winner
						if (Math.abs(v)===3){
							alert("winner! its: "+ ["O"," ","X"][Math.sign(v)]+1);
							break;
						}
					}
				}
			)
		}
		else{
			//check for draw
			let isDraw = true
			for(let i = 0; i<9 && isDraw; i++){
				if (this.state[loc][i] === 0)
					isDraw = false;
			}
			if(isDraw){
				let newstate = this.state[loc];
				newstate.winner = 0;
				this.setState({[loc]:newstate})
			}
		}
	}
	renderInnerBoard(i){
		return (
			<InnerBoard 
				location={i}
				values={this.state[i]}
				updateState={this.updateState}
				validLoc = {this.validLoc}
			/>
		)
	}
	updateState(board, square){
		if (this.validLoc(board) && this.state[board][square] === 0)
		{
			let newstate = this.state[board];
			newstate[square] = this.state.player;
			
			this.setState({[board]:newstate, player: this.state.player*-1, lastLoc: board, nextLoc: square }
			
				,this.calculateWinner
			);
		}
	}
	validLoc(board){
		return (this.state.nextLoc===null || (this.state[this.state.nextLoc].winner !== null && this.state.nextLoc !== board) || (this.state[this.state.nextLoc].winner === null && this.state.nextLoc === board))
	}
	render(){
		return(
			<div>
				{[0,1,2].map((i)=> <div className="row"> {[3*i,3*i+1, 3*i+2].map((j)=> this.renderInnerBoard(j))} </div>)}
				<p>It is player {["O",null, "X"][this.state.player+1]}'s turn</p>
				<button onClick={this.resetGame}>Reset game</button>
			</div>
		)
	}
}

class InnerBoard extends React.Component{
	renderSquare(i){
		return (
			<Square 
				board={this.props.location}
				location={i}
				value={this.props.values[i]}
				updateState={this.props.updateState}
			/>
		)
	}
	render(){
		var validity = this.props.validLoc(this.props.location) ? " valid": " invalid";
		return (<div className={"innerboard winner"+this.props.values.winner + validity}>
				{[0,1,2].map((i)=> <div className="row"> {[3*i,3*i+1, 3*i+2].map((j)=> this.renderSquare(j))} </div>)}
		</div>);		
	}
}

function Square(props) {
	return (
		<div 
			className={"square color"+props.value}
			onClick={()=>props.updateState(props.board, props.location)}
			>{["O"," ","X"][props.value+1]}
		</div>
	);
}
ReactDOM.render(<App />, document.getElementById("root"));