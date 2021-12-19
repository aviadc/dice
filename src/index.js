import React from "react";
import ReactDom from "react-dom";
import "./index.css"
import Player from "./components/Player";
import GameSettings from "./components/GameStettings";
import dice1 from "./img/dice-1.png"
import dice2 from "./img/dice-2.png"
import dice3 from "./img/dice-3.png"
import dice4 from "./img/dice-4.png"
import dice5 from "./img/dice-5.png"
import dice6 from "./img/dice-6.png"
import blackjack from "./img/blackjack.jpg"

const myDice = [dice1,dice2,dice3,dice4,dice5,dice6];

class App extends React.Component{

  state = {
    dice1:blackjack,
    dice2:blackjack,
    player1: {currentScore:0,totalScore:0,color:"red"},
    player2: {currentScore:0,totalScore:0},color:"",
    currentPlayer: 'player1',
    isEndTurn: false,
    isGameOver: false,
    isPlayedOnce: false,
    winner: ""
  }

  setDice = (dice1,dice2)=>{
    if(!this.state.isGameOver){
      const score = dice1+1+dice2+1;
      this.setState({dice1: myDice[dice1],dice2: myDice[dice2]})
      this.updateScore(score,this.state.currentPlayer);
    }
  }

  updateScore =(score,player)=>{
    console.log(this.state.currentPlayer);
    if(!this.state.isGameOver){
      this.checkWinning(score,player);
      if(!this.state.isEndTurn){
        this.setState({[player]: {currentScore: this.state[player].currentScore + score,totalScore: 
          this.state[player].totalScore,color:"red"},isPlayedOnce: true})
      }else{
        this.setState({[player]: {totalScore: this.state[player].currentScore + this.state[player].totalScore, 
          currentScore: 0},})
      }
    }
  }

  hold =()=>{
    if(this.state.isPlayedOnce){
      this.setState({isEndTurn: true,isPlayedOnce: false},()=>{
        this.updateScore(0,this.state.currentPlayer);
        this.setState({isEndTurn: false});
        this.switchTurn();
      });
    }
  }

  updateActivePlayer(player,color){
    this.setState({[player]: {currentScore: this.state[player].currentScore ,totalScore: this.state[player].totalScore,color:color}})
  }

  switchTurn(){
    if(this.state.currentPlayer==='player1'){
      this.setState({currentPlayer: 'player2'},()=>{
        this.updateActivePlayer('player2',"red")
        this.updateActivePlayer('player1',"")
      });
    }else{
      this.setState({currentPlayer: 'player1'},()=>{
        this.updateActivePlayer('player1',"red")
        this.updateActivePlayer('player2',"")
      });
    }
  }

  newGame = ()=>{
    this.setState({
      dice1:blackjack,
      dice2:blackjack,
      player1: {currentScore:0,totalScore:0,color:"red"},
      player2: {currentScore:0,totalScore:0,color:""},
      currentPlayer: "player1",
      isEndTurn: false,
      isGameOver: false,
      isPlayedOnce: false,
      winner: "",
    })
  }
  
  checkWinning =(score,player)=>{
    const totalScore = this.state[player].currentScore+this.state[player].totalScore+score;
    if((totalScore)===21){
      this.winner(player);
    }else if(totalScore>21){
      if(this.state.currentPlayer==="player1"){
        this.winner('player2');
      }else{
        this.winner('player1'); 
      }
    }
  }

  winner = (player)=>{
    this.setState({winner: `${player} won! congratulation`,isGameOver: true}); 
  }

  render(){
    return (
      <>
        <div className="game-title"> 
           <h1>Dice BlackJack</h1>
        </div>
        <div className="game-container">
         <Player player="PLAYER1" 
          currentScore={this.state.player1.currentScore}
          totalScore={this.state.player1.totalScore}
          activeColor={this.state.player1.color}
          />

         <GameSettings  
          diceImg1={this.state.dice1} 
          diceImg2={this.state.dice2}
          roll={this.setDice}
          hold={this.hold}
          newGame={this.newGame}
          winner={this.state.winner}
          />

         <Player player="PLAYER2"
          currentScore={this.state.player2.currentScore} 
          totalScore={this.state.player2.totalScore}
          activeColor={this.state.player2.color}
          />
        </div>
      </>
    )
  }
}

ReactDom.render(<App />,document.querySelector('#root'));