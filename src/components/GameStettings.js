import React from "react";
import "../index.css"

function randomDice(){
  return Math.floor(Math.random()*6);
}

class GameSettings extends React.Component{


rollDice = ()=>{
  let dice1 = randomDice();
  let dice2 = randomDice();
  this.props.roll(dice1,dice2);
}

hold=()=>{
  this.props.hold();
}

newGame = ()=>{
  this.props.newGame();
}

render(){ 
  return (  
    <>
    <div className="game-setting-container">
      <div className="new-game btn" onClick={this.newGame}>NEW GAME</div>
      <div className="first-dice dice"> 
        <img alt="dice" src={this.props.diceImg1} height={'100%'} width={'100%'}/>
      </div>
      <div className="second-dice dice"> 
        <img  alt="dice" src={this.props.diceImg2} height={'100%'} width={'100%'}/>
      </div>
      <div className="roll-dice btn" onClick={this.rollDice}>ROLL DICE</div>
      <div className="hold btn" onClick={this.hold}>HOLD</div>
      <div className="winner">{this.props.winner}</div>
    </div>
    </>
  )
}
}

export default GameSettings