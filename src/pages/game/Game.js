import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Vote from './components/Vote';
import EmitProclamation from './components/EmitProclamation';
import ChooseHeadmaster from './components/ChooseHeadmaster';
import configData from '../../config.json';
import jwt_decode from 'jwt-decode';

const Game = ({gameId}) => {
  const [gameInfo, setGameInfo] = useState({});
  const [gameStatus, setGameStatus] = useState({});
  const [userId, setUserId] = useState(0);

  useEffect(() => {
    const usertoken = localStorage.getItem('user');
    if(usertoken) {
      const id = jwt_decode(usertoken).sub.id;
      setUserId(id);
    }
    //Get game info data
    axios.get(configData.API_URL + '/games/' + gameId, {
      headers: {
          'Authorization': `Bearer ${JSON.parse(usertoken).access_token}` 
        }
      })
      .then(res => {
        if(res.status === 200) {
          setGameInfo(res.data);
        }
      })
      .catch(error => {
        console.log(error)
      })

    //Get status info data
    const getGameData = () => {
      const usertoken = localStorage.getItem('user');
      axios.get(configData.API_URL + '/games/' + gameId + '/status', {
        headers: {
            'Authorization': `Bearer ${JSON.parse(usertoken).access_token}` 
          }
        })
        .then(res => {
          if(res.status === 200) {
            setGameStatus(res.data);
          }
  
          setTimeout(getGameData(), 2000)
        })
        .catch(error => {
          console.log(error)
        })
    }
    getGameData();
  }, [gameId])

  if(gameStatus.phase === 'propose') {
    return(
      <div className="Game">
        <h1 className="center">Game phase: {gameStatus.phase}</h1>    
        <ChooseHeadmaster
          ministerId={gameStatus.minister}
          userId={userId}
          gameId={gameId}
        />
      </div>
    )
  }
  else if(gameStatus.phase === 'vote') {
    return(
      <div className="Game">
        <h1 className="center">Game phase: {gameStatus.phase}</h1> 
        <Vote
          gameId={gameId}
        />
      </div>
    )
  }
  else if(gameStatus.phase === 'headmaster play') {
    return(
      <div className="Game">
        <h1 className="center">Game phase: {gameStatus.phase}</h1>    
        <EmitProclamation
          gameId={gameId}
        />
      </div>
    )
  }
  else {
    return <p></p>
  }
}

export default Game
