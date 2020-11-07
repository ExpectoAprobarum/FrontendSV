import React, { useState } from 'react';
import axios from 'axios';
import configData from '../../../config.json';
import { usePlayer } from '../context/PlayerContext';
import Players from './Players';
import './ChooseHeadmaster.css';

const ChooseHeadmaster = ({gameId, ministerId}) => {
  const {myPlayer, players} = usePlayer();
  const  minister = ministerId === myPlayer.id;
  const [selected, setSelection] = useState(0);

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

  return (
    <div className="ChooseHeadmaster">
      <h1 className="header">Select new headmaster candidate</h1>
      <Players
        selectPlayer={selectPlayer}
        players={players}
        selected={selected}
      />
      <button className="sendCandidate" id="sendCandidate" 
        onClick={() => {
          sendElection()
      }}>
        Choose
      </button>
    </div>
  )
}

export default ChooseHeadmaster
