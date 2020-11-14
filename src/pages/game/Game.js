import React, { useEffect, useState } from 'react';
import axios from 'axios';
import configData from '../../config.json';
import ChooseHeadmaster from './components/ChooseHeadmaster';
import Vote from './components/Vote';
import EmitProclamation from './components/EmitProclamation';
import Board from './components/Board';
import ShowRole from './components/ShowRole';
import CastSpell from './components/CastSpell';
import './Game.css';
import DiscardCard from './components/DiscardCard';


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
      <div className="info">
        <div className="game-phase">
          <h2>Game phase:</h2>
          <h3>{gameStatus === undefined ? " " : gameStatus.phase}</h3>
        </div>
        <div className="role">
          <div className="role-container">
            <div className="role-header">
              <h3>My role:</h3>
            </div>
            <ShowRole gameId={gameId}/>
          </div>
        </div>
      </div>
      <div className="board">
        <Board 
          gameId={gameId}
        />
      </div>
      <div className="phase">
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
                      headmasterId={gameStatus.headmaster}
                    />
                  </div>
                ) : (
                  gameStatus.phase === 'spell play' ? (
                    <div>
                      <CastSpell
                        gameId={gameId}
                        ministerId={gameStatus.minister}
                      />
                    </div>
                  ) : (
                    gameStatus.phase === 'minister play' ? (
                      <div>
                        <DiscardCard
                          gameId={gameId}
                        />
                      </div>
                    ) : (
                      <p>Awaiting response...</p>
                    )
                  )
                )
              )
            )
          ) : (
            <h1 className="startingGame">Starting Game ...</h1>
          )
        }
      </div>
    </div>
  )
}

export default Game
