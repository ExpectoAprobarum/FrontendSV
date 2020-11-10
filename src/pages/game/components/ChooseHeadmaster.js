import React, { useEffect, useState } from 'react';
import axios from 'axios';
import configData from '../../../config.json';
import { getMyPlayer, getPlayers } from '../../../commons/players/players';
import PlayerList from './PlayerList';
import './ChooseHeadmaster.css';

const ChooseHeadmaster = ({gameId, ministerId}) => {
  const [selected, setSelection] = useState(0);
  const [players, setPlayers] = useState([]);
  const [myPlayer, setMyPlayer] = useState({});
  
  useEffect(() => {
    getMyPlayer(gameId)
      .then(res => {
        setMyPlayer(res)
      });
    getPlayers(gameId)
      .then(res => {
        setPlayers(res)
      });
  }, []);

  const selectPlayer = (id) => {
    setSelection(id);
  }

  const sendElection = () => {
    const usertoken = localStorage.getItem('user');
    axios.post(configData.API_URL + '/games/' + gameId + '/choosehm', 
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

  return ( myPlayer.id === ministerId ? (
      <div className="ChooseHeadmaster">
        <h2 className="header">Select new headmaster candidate:</h2>
        <div className="player-list">
          <PlayerList
            selectPlayer={selectPlayer}
            players={players}
            ministerId={ministerId}
            selected={selected}
          />
        </div>
        <button className="sendCandidate" id="sendCandidate" 
          onClick={() => {
            sendElection()
        }}>
          Choose
        </button>
      </div>
    ) : (
      <p />
    )
  )
}

export default ChooseHeadmaster
