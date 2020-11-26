import React, { useEffect, useState } from 'react';
import axios from 'axios';
import configData from '../../../../config.json';
import { getPlayers } from '../../../../commons/players/players';
import PlayerList from '../PlayerList';
import { notify_player_choose_err } from '../../../../commons/alerts/toast';
import './SpellObjective.css';

const Imperius = ({gameId, ministerId}) => {
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
    axios.post(configData.API_URL + '/games/' + gameId + '/imperius',
      { "id": selected }, {
      headers: {
          'Authorization': `Bearer ${JSON.parse(usertoken).access_token}`
        }
      })
      .then(res => {
        console.log(res.status)
      })
      .catch(error => {
        notify_player_choose_err();
      })
  }

  return (
    <div className="Spell">
      <h2 className="header">Select player to cast: Imperius</h2>
      <div className="player-list">
        <PlayerList
          selectPlayer={selectPlayer}
          selected={selected}
          players={players}
          showCond={["alive", true]}
          chooseCond={["alive", true]}
          minister={[ministerId, true]}
        />
      </div>
      <button className="sendSpellElection" id="sendSpellElection"
        onClick={sendElection}>
        Choose
      </button>
    </div>
  )
}

export default Imperius
