import React, { useEffect, useState } from 'react';
import axios from 'axios';
import configData from '../../config.json';
import ChooseHeadmaster from './components/ChooseHeadmaster';
import Vote from './components/Vote';
import EmitProclamation from './components/EmitProclamation';
import ShowRole from './components/ShowRole'

const Game = ({gameId}) => {
  const [gameInfo, setGameInfo] = useState({});
  const [gameStatus, setGameStatus] = useState({});

  useEffect(() => {
    const getGameInfo = () => {
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

    const timer = setInterval(() => {
      getGameInfo();
    }, 2000);

    return () => clearInterval(timer)
  }, [gameId, gameInfo.status])

  return (
    <div className="Game">
      <h1 className="center">Game phase: {gameStatus===undefined ?
        "" : gameStatus.phase}</h1>
      <ShowRole gameId={gameId}/>
      {
        gameStatus ? (
          gameStatus.phase === 'propose' ? (
            <div>
              <ChooseHeadmaster
                gameId={gameId}
                ministerId={gameStatus.minister}
              />
            </div>
          ) : (
            gameStatus.phase === 'vote' ? (
              <div>
                <Vote
                  gameId={gameId}
                />
              </div>
            ) : (
              gameStatus.phase === 'headmaster play' ? (
                <div>
                  <EmitProclamation
                    gameId={gameId}
                  />
                </div>
              ) : (
                <p>Awaiting response...</p>
              )
            )
          )
        ) : (
          <h1 className="startingGame">Starting Game ...</h1>
        )
      }
    </div>
  )
}

export default Game
