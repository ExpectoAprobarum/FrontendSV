import React, { useEffect } from 'react';
import axios from 'axios';
import configData from '../../../../config.json';
import './Divination.css';

const Divination = ({gameId, passDivination, setDivinationInfo}) => {

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
            passDivination(res.data.data);
          }
        })
        .catch(error => {
          console.log(error)
        })
    }

    getCards();
    setDivinationInfo(true);
  }, [gameId])

  return (
    <div className="Divination">
      <h2 className="header">
        Getting Divination cards ...
      </h2>
    </div>  
  )
}

export default Divination
