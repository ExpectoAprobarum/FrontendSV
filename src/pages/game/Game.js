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

    const getGameInfo = () => {
      console.log("entre a timeout");
      const usertoken = localStorage.getItem('user');
      axios.get(configData.API_URL + '/games/' + gameId, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(usertoken).access_token}` 
          }
      })
      .then(res => {
        if(res.status === 200) {
          setGameInfo(res.data);
          setGameStatus(gameInfo.status);
        }
      })
      .catch(error => {
        console.log(error)
      })
    }

    const timer = setTimeout(() => {
      getGameInfo();
    }, 2000);

    return () => clearTimeout(timer)
  }, [gameId, gameInfo.status])

  if(gameStatus && gameStatus.phase === 'propose') {
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
  else if(gameStatus && gameStatus.phase === 'vote') {
    return(
      <div className="Game">
        <h1 className="center">Game phase: {gameStatus.phase}</h1> 
        <Vote
          gameId={gameId}
        />
      </div>
    )
  }
  else if(gameStatus && gameStatus.phase === 'headmaster play') {
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
