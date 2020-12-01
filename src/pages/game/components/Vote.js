import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { notify_player_vote_success, notify_player_vote_err }
    from '../../../commons/alerts/toast';
import configData from '../../../config.json';
import './Vote.css';
import { getMyPlayer } from '../../../commons/players/players';

const Vote = ({gameId}) => {
  const [myPlayer, setMyPlayer] = useState({});

  useEffect(() => {
    getMyPlayer(gameId)
      .then(res => {
        setMyPlayer(res)
      })
  }, [gameId])

  const vote = (e) => {
    let selection = e.target.id;
    const usertoken = localStorage.getItem('user');
    axios.post(configData.API_URL + '/games/' + gameId + '/vote',
      { vote: selection === 'lumos' }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(usertoken).access_token}`
          }
    })
    .then(res => {
      if(res.status === 200) {
        notify_player_vote_success();
      }
    })
    .catch(error => {
      notify_player_vote_err();
    })

    document.getElementById("lumos").disabled = true;
    document.getElementById("nox").disabled = true;
  }

  return (
    <div className="Vote">
      { myPlayer.alive ? (
        <div className="alive">
          <h2 className="header">
            Vote new Minister and Headmaster:
          </h2>
          <div className="vote">
            <button className="vote-card" id="lumos"
              onClick={(e) => {vote(e)}} />
            <button className="vote-card" id="nox"
              onClick={(e) => {vote(e)}} />
          </div>
        </div>
      ) : (
        <div className="dead">
          <h2 className="header">
            Players are voting new government ...
          </h2>
        </div>
        )
      }
    </div>
  )
}

export default Vote
