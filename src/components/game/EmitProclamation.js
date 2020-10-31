import React, { useRef } from 'react';
import axios from 'axios';
import configData from '../../config.json';
import './EmitProclamation.css';

const EmitProclamation = ({phase, cards, headmaster, gameId}) => {
  let card1 = useRef();
  let card2 = useRef();

  const disableButtons = () => {
    card1.current.setAttribute("disabled", "disabled");
    card2.current.setAttribute("disabled", "disabled")
  }

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

    disableButtons();
  }

  return phase === 'EMIT_PROC' /*&& headmaster === current player user_id???*/? (
    <div id="proclam">
      <button className="phoenix" ref={card1} onClick={(e) => {choose(e)}}></button>
      <button className="death" ref={card2} onClick={(e) => {choose(e)}}></button>
    </div>
  ) : (
    <p></p>
  );
}

export default EmitProclamation