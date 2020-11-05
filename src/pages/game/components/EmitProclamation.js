import React, { useEffect, useState } from 'react';
import axios from 'axios';
import configData from '../../../config.json';
import './EmitProclamation.css';

const EmitProclamation = ({gameId}) => {
  const [player, setPlayer] = useState({});
  const [cards, setCards] = useState([]);

  const getPlayerInfo = () => {
    const usertoken = localStorage.getItem('user');
    axios.get(configData.API_URL + '/games/' + gameId + '/me', {
      headers: {
          'Authorization': `Bearer ${JSON.parse(usertoken).access_token}` 
        }
      })
      .then(res => {
        if(res.status === 200) {
          setPlayer(res.data);
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  const getCards = () => {
    const usertoken = localStorage.getItem('user');
    axios.get(configData.API_URL + '/games/' + gameId + '/proclamations', {
      headers: {
          'Authorization': `Bearer ${JSON.parse(usertoken).access_token}` 
        }
      })
      .then(res => {
        if(res.status === 200) {
          setCards(res.data.data);
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  const choose = (e) => {
    let choice = e.target.className.split(' ')[0];
    const usertoken = localStorage.getItem('user');
    axios.post(configData.API_URL + '/games/' + gameId + '/proclamations',
      { card: choice }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(usertoken).access_token}` 
          }
        })
      .then(res => {
        if (res.status === 200) {
          console.log(res.status);
        }
      })
      .catch(error => {
        console.log(error)
      })

    document.getElementById("proc1").disabled = true;
    document.getElementById("proc2").disabled = true;
  }

  useEffect(() => {
    getPlayerInfo();
    getCards();
  })

  return player.current_position === "headmaster" ? (
    <div className="proclam">
      <button className={cards[0] + " card left"} id="proc1" onClick={(e) => {choose(e)}}></button>
      <button className={cards[1] + " card right"} id="proc2" onClick={(e) => {choose(e)}}></button>
    </div>
  ) : (
    <p></p> 
  )
}

export default EmitProclamation
