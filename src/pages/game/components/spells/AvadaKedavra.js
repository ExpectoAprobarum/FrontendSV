import React, { useEffect, useState } from 'react';
import axios from 'axios';
import configData from '../../../../config.json';
import { getPlayers } from '../../../../commons/players/players';
import PlayerList from '../PlayerList';
import './AvadaKedavra.css';

const AvadaKedavra = ({gameId, ministerId}) => {
  const [selected, setSelection] = useState(0);
  const [players, setPlayers] = useState([]);
  
  useEffect(() => {
    getPlayers(gameId)
      .then(res => {
        setPlayers(res)
      });
  }, [gameId]);

  const selectPlayer = (id) => {
    setSelection(id);
  }

  const sendElection = () => {
    const usertoken = localStorage.getItem('user');
    axios.post(configData.API_URL + '/games/' + gameId + '/avadakedavra', 
    {id: selected}, {
      headers: {
          'Authorization': `Bearer ${JSON.parse(usertoken).access_token}` 
        }
      })
      .then(res => {
        console.log(res.status)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <div className="AvadaKedavra">
      <h2 className="header">Select player to cast: Avada Kedavra</h2>
      <div className="player-list">
        <PlayerList
          selectPlayer={selectPlayer}
          players={players}
          ministerId={ministerId}
          selected={selected}
        />
      </div>
      <button className="sendKilled" id="sendKilled" 
        onClick={() => {
          sendElection()
      }}>
        Choose
      </button>
    </div>
  )
}

export default AvadaKedavra
