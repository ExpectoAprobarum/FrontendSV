import React from 'react';
import './PlayerList.css';

const PlayerList = ({selectPlayer, players, ministerId, selected}) => {
  const choosablePlayers = players.filter(player => {
    return (player.id !== ministerId) && player.alive
    }).map(player => {
      return selected !== player.id ? (
          <li className="player" key={player.id}>
            <button className="player-bttn"
              onClick={() => {
                selectPlayer(player.id)
              }}>
              <div>{player.user.username}</div>
            </button>
          </li>
      ) : (
        <li className="player" key={player.id}>
          <button className="selectedPlayer-bttn" 
            onClick={() => {
              selectPlayer(player.id)
            }}>
            <div>{player.user.username}</div>
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
