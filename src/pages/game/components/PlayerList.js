import React from 'react';
import './PlayerList.css';

const PlayerList = ({selectPlayer, players, ministerId, selected}) => {
  const choosablePlayers = players.filter(player => {
    return (player.id !== ministerId) && player.alive
    }).map(player => {
      return selected !== player.id ? (
          <div className="player" key={player.id}>
            <button className="player-bttn"
              onClick={() => {
                selectPlayer(player.id)
              }}>
              <div>{player.user.username}</div>
            </button>
          </div>
      ) : (
        <div className="player" key={player.id}>
          <button className="selectedPlayer-bttn" 
            onClick={() => {
              selectPlayer(player.id)
            }}>
            <div>{player.user.username}</div>
          </button>
        </div>
      )
  })

  const deadPlayers = players.filter(player => {
    return player.id === ministerId 
  }).map(player => {
    return ( 
      player ? (
        <div className="player">
          <div className="dead">
            <div>{player.user.username}</div>
          </div>
        </div>
      ) : (
      <p />
      )
    )
  })

  const ministerPlayer = players.filter(player => {
    return player.id === ministerId
  })

  return (
    <div className="player-list">
      <div className="minister">
        <div disabled="disabled">
          <div>{ministerPlayer.id}</div>
        </div>
      </div>
      <div className="aliveList">
        { choosablePlayers }
      </div>
      <div className="deadList">
        { deadPlayers }
      </div>
    </div>
  )
}

export default PlayerList
