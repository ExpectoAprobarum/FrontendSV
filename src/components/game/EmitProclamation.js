import React from 'react';
import axios from 'axios';
import configData from '../../config.json';
import './EmitProclamation.css';

const EmitProclamation = ({phase, cards, headmaster, gameId}) => {

  const choose = (e) => {
    let choice = e.target.className.split(' ')[0];
    axios.post(configData.API_URL + '/games/' + gameId + '/proclamations',
      { proclamation: choice } )
      .then(res => {
        if (res.status === 200) {
          console.log(res.status);
        }
      }
    );
  }

  return phase === 'EMIT_PROC' /*&& headmaster === current player user_id???*/? (
    <div id="proclam">
      <button className="phoenix" onClick={(e) => {choose(e)}}></button>
      <button className="death" onClick={(e) => {choose(e)}}></button>
    </div>
  ) : (
    <p></p>
  );
}

export default EmitProclamation