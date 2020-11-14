import React, { useEffect, useState } from 'react';
import axios from 'axios';
import configData from '../../../config.json';
import { getMyPlayer } from '../../../commons/players/players';
import './DiscardCard.css';

const DiscardCard = ({gameId, ministerId}) => {
  const [cards, setCards] = useState([]);
  const [myPlayer, setMyPlayer] = useState({});

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
    document.getElementById("proc3").disabled = true;
  }

  useEffect(() => {
    getMyPlayer(gameId)
      .then(res => {
        setMyPlayer(res)
      });
    getCards();
  }, [])

  return (
    <div className="discard">
    { myPlayer.id === ministerId ? (
        <div className="is-minister">
          <h2 className="header">
            Discard proclamation:
          </h2>
          <div className="cards">
            <button className={cards[0] + " card left"} id="proc1"
              onClick={(e) => {
                choose(e)
              }} 
            />
            <button className={cards[1] + " card center"} id="proc2"
              onClick={(e) => {
                choose(e)
              }} 
            />
            <button className={cards[2] + " card right"} id="proc3"
              onClick={(e) => {
                choose(e)
              }} 
            />
          </div>
        </div>
      ) : (
        <div className="not-minister">
          <h2 className="header">
            Minister is discarding proclamation ...
          </h2>
        </div>
      )
    }   
    </div>
  )
}

export default DiscardCard
