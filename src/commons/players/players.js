import axios from 'axios';
import configData from '../../config.json';

export function getPlayers(gameId) {
  const usertoken = localStorage.getItem('user');
  return axios.get(configData.API_URL + '/games/' + gameId + '/players', {
    headers: {
        'Authorization': `Bearer ${JSON.parse(usertoken).access_token}` 
      }
    })
  .then(res => res.data.data)
}

export function getMyPlayer(gameId) {
  const usertoken = localStorage.getItem('user');
  return axios.get(configData.API_URL + '/games/' + gameId + '/me', {
    headers: {
        'Authorization': `Bearer ${JSON.parse(usertoken).access_token}` 
      }
    })
  .then(res => res.data)
}
