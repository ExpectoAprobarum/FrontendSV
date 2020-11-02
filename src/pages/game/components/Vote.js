import React, { useRef } from 'react';
import axios from 'axios';
import configData from '../../../config.json';
import './Vote.css';

const Vote = ({phase, gameId}) => {
  let lumosRef = useRef();
  let noxRef = useRef();

  const disableButtons = () => {
    lumosRef.current.setAttribute("disabled", "disabled");
    noxRef.current.setAttribute("disabled", "disabled");
  }
  const vote = (e) => {
    let vote = e.target.className.split(' ')[0];
    axios.post(configData.API_URL + '/games/' + gameId + '/vote', 
      { vote: vote === 'lumos' } );
    disableButtons();
  }
  return phase === 'vote' ? (
    <div className="vote">
      <button className="lumos card center" ref={lumosRef} onClick={(e) => {vote(e)}}></button>
      <button className="nox card center" ref={noxRef} onClick={(e) => {vote(e)}}></button>
    </div>
  ) : (
    <div className="vote"></div>
  )
}

export default Vote;
