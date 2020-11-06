import React, { useEffect, useState } from 'react';
import axios from 'axios';
import configData from '../../../config.json';
import Players from './Players';
import './ChooseHeadmaster.css';

const ChooseHeadmaster = ({gameId, userId, ministerId}) => {
  const [minister, setMinister] = useState(false);
  const [players, setPlayers] = useState([]);
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
          setPlayers(res.data);
          let isMinister = ministerId === res.data.data.filter(player => {
            return player.user.id === userId
          })[0].id
          setMinister(isMinister);
        }
      })
      .catch(error => {
        console.log(error)
      })
    }
    getPlayers();
  }, [ministerId, gameId, userId])

  return minister ? (
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
  ) : (
    <p />
  );
}

export default ChooseHeadmaster
