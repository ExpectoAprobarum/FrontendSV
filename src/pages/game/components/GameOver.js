import React from 'react';
import { useHistory } from 'react-router-dom';
import './GameOver.css';
import '../../creategame/buttonStyle.css';

const GameOver = ({winner, reason}) => {
  const history = useHistory();

  const leaveGame = () => {
    let path = "/home";
    history.push(path);
  }

  const winnerTag = winner.split(" ")[0];
  return(
    <div className="GameOver">
      <div className={winnerTag.toLowerCase() + "-win"}>
        <div className="winner">
          <h3>The winner is:</h3>
          <h2>{winner}</h2>
          <h3>Reason: {reason}</h3>
        </div>
        <div className="button-container-1">
          <span className="mas">Are you sure ?</span>
          <button className="exit-game" onClick={leaveGame}>
            Exit Game
          </button>
        </div>
      </div>
    </div>
  )
}

export default GameOver
