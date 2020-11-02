import React from 'react';
import './Players.css'

const Players = ({players, selectPlayer, selected}) => {
  const playerList = players.map(player => {
      return selected !== player.id ? (
          <div className="player" key={player.id}>
            <button className="player-bttn" onClick={() => {selectPlayer(player.id)}}>
              <div>Name: {player.name}</div>
              <div>Username: {player.username}</div>
              <div>ID: {player.id}</div>
            </button>
          </div>
      ) : (
        <div className="selectedPlayer" key={player.id}>
          <button className="selectedPlayer-bttn" onClick={() => {selectPlayer(player.id)}}>
            <div>Name: {player.name}</div>
            <div>Username: {player.username}</div>
            <div>ID: {player.id}</div>
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
