import React from 'react';
import './PlayerList.css';

const PlayerList = ({selectPlayer, players, ministerId, selected}) => {
  players = [...players,
    {
      id: 12121,
      alive: true,
      user: {
        username: "pepe",
        id: 45
      }
    },
    {
      id: 78741,
      alive: true,
      user: {
        username: "leo",
        id: 781
      }
    },
    {
      id: 7811,
      alive: true,
      user: {
        username: "nombrelargo",
        id: 787
      }
    },
    {
      id: 7211,
      alive: true,
      user: {
        username: "aaaaaaaaaa",
        id: 71112
      }
    },
    {
      id: 1211,
      alive: true,
      user: {
        username: "carlos",
        id: 711341
      }
    },
    {
      id: 331211,
      alive: true,
      user: {
        username: "veronica",
        id: 708121
      }
    },
    {
      id: 10254,
      alive: true,
      user: {
        username: "xxKillerxXxx",
        id: 780341
      }
    },
    {
      id: 12191,
      alive: true,
      user: {
        username: "sebastian",
        id: 87845
      }
    }
  ]
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
