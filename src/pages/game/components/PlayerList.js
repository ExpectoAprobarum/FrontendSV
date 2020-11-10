import React from 'react';
import './PlayerList.css';

const PlayerList = ({selectPlayer,/* players,*/ ministerId, selected}) => {
  const players = [];
  players.push(
    {
      id: 900,
      alive: false,
      user: {
        username: "Carl",
        id: 5000
      }
    },
    {
      id: 243,
      alive: true,
      user: {
        username: "Pepe",
        id: 1003
      }
    },
    {
      id: 569,
      alive: true,
      user: {
        username: "Jhon",
        id: 95959
      }
    }
  );
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

  return (
    <div className="playerList">
      <div className="alive">
        <div className="aliveList">
          { choosablePlayers }
        </div>
      </div>
    </div>
  )
}

export default PlayerList
