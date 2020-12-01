import React, { useEffect, useState } from 'react';
import axios from 'axios';
import configData from '../../../config.json';
import { getMyPlayer, getPlayers } from '../../../commons/players/players';
import PlayerList from './PlayerList';
import { notify_player_choose_err } from '../../../commons/alerts/toast';

const SelectPlayer = ({gameId, ministerId, phase, funChoose}) => {
  const [selected, setSelection] = useState(0);
  const [players, setPlayers] = useState([]);
  const [myPlayer, setMyPlayer] = useState({});

  const phaseData = new Map([
    ['choosehm', 
      [
        "Select new headmaster candidate:", 
        "Minister is chosing headmaster candidate ...",
        ["alive", true],
        ["choosable", true],
        false
      ]
    ],
    ['crucio',
      [
        "Select player to cast: Crucio",
        "Minister is casting Spell: CRUCIO",
        ["alive", true],
        ["alive", true],
        true
      ]
    ],
    ['avadakedavra', 
      [
        "Select player to cast: Avada Kedavra",
        "Minister is casting Spell: AVADA KEDAVRA",
        ["alive", true],
        ["alive", true],
        false
      ]
    ],
    ['imperius', 
      [
        "Select player to cast: Imperius",
        "Minister is casting Spell: IMPERIUS",
        ["alive", true],
        ["alive", true],
        true
      ]
    ]
  ]);

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
    axios.post(configData.API_URL + '/games/' + gameId + '/' + phase,
    { id: selected }, {
      headers: {
          'Authorization': `Bearer ${JSON.parse(usertoken).access_token}`
        }
      })
      .catch(error => {
        notify_player_choose_err();
      })
  }

  const chooseFun = () => {
    if(funChoose === undefined) {
      sendElection();
    } else {
      funChoose(selected);
    }
  }

  return (
    <div className="SelectPlayer">
      { myPlayer.id === ministerId ? (
        <div className="is-minister">
          <h2 className="header">
            { phaseData.get(phase)[0] }
          </h2>
          <div className="player-list">
            <PlayerList
              selectPlayer={selectPlayer}
              selected={selected}
              players={players}
              showCond={phaseData.get(phase)[2]}
              chooseCond={phaseData.get(phase)[3]}
              minister={[ministerId, phaseData.get(phase)[4]]}
            />
          </div>
          <button className="sendCandidate" onClick={chooseFun} >
            Choose
          </button>
        </div>
      ) : (
        <div className="not-minister">
          <h2 className="header">
            { phaseData.get(phase)[1] }
          </h2>
        </div>
      )
    }
    </div>
  )
}

export default SelectPlayer
