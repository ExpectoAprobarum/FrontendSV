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
import GameOver from './components/GameOver';
import SendMessage from './chat/sendmessage'
import WindowChat from './chat/windowChat'
import { MessageList } from 'react-chat-elements'
import RolesCommonMort from './components/RolesCommonM'
import './Game.css';

const Game = ({gameId}) => {
  const [gameStatus, setGameStatus] = useState({});
  const [showChat, setShowChat] = useState(false)
  const [showLoyalty, setShowLoyalty] = useState(false)

  const showloyalty = () => {
    setShowLoyalty(true)
  }

  const showtheChat = () =>{
    setShowChat(true)
  }

  const closetheChat= () => {
    setShowChat(false)
  }

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
  
        { showChat ?  
          <div> 
            <div className='showmeMessageChat'>
              <WindowChat  
                gameId={gameId} 
              />
            </div>  
            <div className='sendMsessageChat'>
              <SendMessage
                gameId={gameId}
              />
            </div>
            <button  onClick={closetheChat} className='closeChat'></button> 
          </div>
        : 
        <button  onClick={showtheChat} className='showChat'></button>  
        }
        { showLoyalty ? 
          <div className='showLoyalty'>
          <RolesCommonMort
            gameId={gameId} /> 
          </div>
          :
          <p></p>
        } 
        
        <button className='showLoyaltybutton' onClick={showloyalty}></button>
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
