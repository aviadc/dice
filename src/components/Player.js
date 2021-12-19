import React from "react";
import "../index.css"

class Player extends React.Component{

 

  render(){
    return (
      <>
        <div className="player-container">
          <h2 className="player-title" style={{backgroundColor: this.props.activeColor}}>{this.props.player} </h2>
          <div className="current-score-container score-container">
            <h2 className="current-score-title score-title">CURRENT SCORE</h2>
            <h2 className="current-score score">{this.props.currentScore}</h2>
          </div>
          <div className="player-middle"></div>
          <div className="total-score-container score-container">
            <h3 className="total-score-title score-title">TOTAL SCORE</h3>
            <h3 className="total-score score">{this.props.totalScore}</h3>
          </div>
        </div>
      </>
    )
  }
}

export default Player;