import React from 'react';
import './PlayerList.css';

const PlayerList = ({selectPlayer, selected, players, 
                     showCond, chooseCond, minister}) => {
  const choosablePlayers = players.filter(player => {
    return player[showCond[0]] === showCond[1]
    }).filter(player => {
      return minister[1] ? true : player.id !== minister[0]
    }).map(player => {
      return selected !== player.id ? (
          <li className="player" key={player.id}>
            <button className={player[chooseCond[0]] === chooseCond[1] ? 
                "ischoosable" : "nonchoosable"}
              onClick={() => {
                selectPlayer(player.id)
              }}>
              <div>{player.user.useralias}</div>
            </button>
          </li>
      ) : (
        <li className="player" key={player.id}>
          <button className="selectedPlayer-bttn" 
            onClick={() => {
              selectPlayer(player.id)
            }}>
            <div>{player.user.useralias}</div>
          </button>
        </li>
      )
  })

  return (
    <div className="playerList">
      <div className="list-container">
        <ul>
          { choosablePlayers }
        </ul>
      </div>
    </div>
  )
}

export default PlayerList
