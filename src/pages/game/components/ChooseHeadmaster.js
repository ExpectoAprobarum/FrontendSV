import React, { useEffect, useState } from 'react';
import axios from 'axios';
import configData from '../../../config.json';
import { getMyPlayer, getPlayers } from '../../../commons/players/players';
import PlayerList from './PlayerList';
import './ChooseHeadmaster.css';
import { notify_player_choosehm_err } from '../../../commons/alerts/toast';

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
  }, [gameId]);

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
        notify_player_choosehm_err();
      })
  }

  return (
    <div className="ChooseHeadmaster">
      { myPlayer.id === ministerId ? (
        <div className="is-minister">
          <h2 className="header">
            Select new headmaster candidate:
          </h2>
          <div className="player-list">
            <PlayerList
              selectPlayer={selectPlayer}
              players={players}
              ministerId={ministerId}
              selected={selected}
            />
          </div>
          <button className="sendCandidate"
            onClick={() => {
              sendElection()
          }}>
            Choose
          </button>
        </div>
      ) : (
        <div className="not-minister">
          <h2 className="header">
            Minister is chosing headmaster candidate ...
          </h2>
        </div>
      )  
    }
    </div>
  )
}

export default ChooseHeadmaster
