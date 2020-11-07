import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import configData from '../../../config.json';

const PlayerContext = React.createContext();

export function PlayerProvider({gameId, userId}) {
  const [myPlayer, setMyPlayer] = useState({});
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const getPlayers = () => {
      const usertoken = localStorage.getItem('user');
      axios.get(configData.API_URL + '/games/' + gameId + '/players', {
        headers: {
            'Authorization': `Bearer ${JSON.parse(usertoken).access_token}` 
          }
        })
      .then(res => {
        if(res.status === 200) {
          setPlayers(res.data.data);
          setMyPlayer(res.data.data.filter(player => {
            return player.user.id === userId
          })[0]);
        }
      })
      .catch(error => {
        console.log(error)
      })
    }
    getPlayers();
  }, [gameId, userId])

  const playerInfo = useMemo(() => {
    return ({
      myPlayer,
      players
    })
  }, [myPlayer, players])

  return <PlayerContext.Provider value={playerInfo} />
}

export function usePlayer() {
  const context = React.useContext(PlayerContext)
  if (!context) {
    throw new Error('usePlayer must be inside PlayerContext provider')
  }
  return context;
}
