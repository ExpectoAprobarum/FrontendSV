import React from 'react';
import axios from 'axios';
import configData from '../../../config.json';
import './Vote.css';

const Vote = ({gameId}) => {

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
        console.log(res.status)
      }
    })
    .catch(error => {
      console.log(error)
    })

    document.getElementById("lumos").disabled = true;
    document.getElementById("nox").disabled = true;
  }

  return (
    <div className="Vote">
      <h2 className="header">
        Vote new Minister and Headmaster:
      </h2>
      <div className="vote">
        <button className="vote-card" id="lumos" onClick={(e) => {vote(e)}} />
        <button className="vote-card" id="nox" onClick={(e) => {vote(e)}} />
      </div>
    </div>
  )
}

export default Vote
