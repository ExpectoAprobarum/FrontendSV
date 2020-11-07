import React from 'react';
import './Players.css'

const Players = ({selectPlayer, players, selected}) => {
  const playerList = players.map(player => {
      return selected !== player.id ? (
          <div className="player" key={player.id}>
            <button className="player-bttn" onClick={() => {selectPlayer(player.id)}}>
              <div>{player.user.username}</div>
            </button>
          </div>
      ) : (
        <div className="player" key={player.id}>
          <button className="selectedPlayer-bttn" onClick={() => {selectPlayer(player.id)}}>
            <div>{player.user.username}</div>
          </button>
        </div>
      )
  })

  return (
    <div className="player-list">
      { playerList }
    </div>
  )
}

export default Players;
