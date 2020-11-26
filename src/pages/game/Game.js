import React, { useEffect, useState } from 'react';
import axios from 'axios';
import configData from '../../config.json';
import ChooseHeadmaster from './components/ChooseHeadmaster';
import Vote from './components/Vote';
import DiscardCard from './components/DiscardCard';
import EmitProclamation from './components/EmitProclamation';
import CastSpell from './components/CastSpell';
import Board from './components/Board';
import ShowRole from './components/ShowRole';
import ShowResultVote from './components/ShowResultVote';
import ShowDivination from './components/ShowDivination';
import GameOver from './components/GameOver';
import './Game.css';

const Game = ({gameId}) => {
  const [gameStatus, setGameStatus] = useState({});
  const [divination, setDivination] = useState([]);
  const [showDivination, setShowDivination] = useState(false);

  useEffect(() => {
    const getGameStatus = () => {
      const usertoken = localStorage.getItem('user');
      axios.get(configData.API_URL + '/games/' + gameId + "/status", {
        headers: {
            'Authorization': `Bearer ${JSON.parse(usertoken).access_token}`
          }
      })
      .then(res => {
        if(res.status === 200) {
          setGameStatus(res.data);
        }
      })
      .catch(error => {
        console.log(error)
      })
    }

    const timer = setInterval(() => {
      getGameStatus();
    }, 2000);

    return () => clearInterval(timer)
  }, [gameId])

  const passDivination = (cards) => {
    setDivination(cards);
  }

  const showDivinationInfo = (show) => {
    setShowDivination(show)
  }

  return (
    <div className="Game">
      <div className="info">
        <div className="game-phase">
          <h2>Game phase:</h2>
          <h3>
            { gameStatus !== undefined ? (
              gameStatus.winner === undefined ? (
                gameStatus.phase !== undefined ? (
                  gameStatus.phase.toUpperCase()
                ) : (
                    " "
                )
              ) : "GAME OVER"
            ) : " " }
          </h3>
        </div>
        <div className="role">
          <div className="role-container">
            <ShowRole gameId={gameId} gameInfo={gameStatus}/>
          </div>
        </div>
        <ShowResultVote
          gameId={gameId}
          gameInfo={gameStatus}
        />
        <div className="show-divination">
          {
            gameStatus ? (
              <ShowDivination
                divination={divination}
                showCards={showDivination}
              />
            ) : (
              <p />
            )
          }
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
            gameStatus.winner === undefined ? (
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
                        setDivinationInfo={showDivinationInfo}
                      />
                    </div>
                  ) : (
                    gameStatus.phase === 'spell play' ? (
                      <div>
                        <CastSpell
                          gameId={gameId}
                          ministerId={gameStatus.minister}
                          passDivination={passDivination}
                          setDivinationInfo={showDivinationInfo}
                        />
                      </div>
                    ) : (
                      gameStatus.phase === 'minister play' ? (
                        <div>
                          <DiscardCard
                            gameId={gameId}
                            ministerId={gameStatus.minister}
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
              <div className="game-over">
                <GameOver
                  winner={gameStatus.winner}
                  reason={gameStatus.detail}
                />
              </div>
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
