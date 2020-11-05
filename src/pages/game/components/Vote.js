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
    let voteDef = e.target.className.split(' ')[0];
    const usertoken = localStorage.getItem('user');
    axios.post(configData.API_URL + '/games/' + gameId + '/vote', 
      { vote: voteDef === 'lumos' }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(usertoken).access_token}` 
          }
        } );
    disableButtons();
  }
  return (
    <div className="vote">
      <button className="lumos card center" ref={lumosRef} onClick={(e) => {vote(e)}}></button>
      <button className="nox card center" ref={noxRef} onClick={(e) => {vote(e)}}></button>
    </div>
  )
}

export default Vote
