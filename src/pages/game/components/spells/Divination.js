import React, { useEffect, useState } from 'react';
import axios from 'axios';
import configData from '../../../../config.json';
import './Divination.css'

const Divination = ({gameId}) => {
  const [showCards, setShowCards] = useState(false);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const getCards = () => {
      const usertoken = localStorage.getItem('user');
      axios.get(configData.API_URL + '/games/' + gameId + '/divination', {
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

    getCards();

    setShowCards(true);
    setTimeout(() => {
      setShowCards(false)
    }, 8000);
  }, [gameId])

  return (
    <div className="Divination">
      { showCards ? (
        <div className="divination">
          <h2 className="header">
            Divination cards:
          </h2>
          <div className="divination-cards">
            <button className={cards[0] + " left"} id="proc1" disabled/>
            <button className={cards[1] + " center"} id="proc2" disabled/>
            <button className={cards[2] + " right"} id="proc3" disabled/>
          </div>
        </div>
      ) : null}
    </div>  
  )
}

export default Divination
