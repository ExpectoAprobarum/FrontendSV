import React, { useEffect, useState } from 'react';
import { getPlayers } from '../../../commons/players/players';
import PopupVote from './popupVote';
import lumos from '../assets/lumos.png';
import nox from '../assets/nox.png';

const ShowResultVote = ({gameId, gameInfo}) => {
  const [players, setPlayers] = useState([]);
  const [resultVote, setResultVote] = useState("");
  const [countVotes, setCountVotes] = useState([0, -1]);
  const [showResult, setShowResult] = useState([false, 0]);
  const [headM, setHeadM] = useState([])

  const getP = () => {
    getPlayers(gameId)
      .then(res => {
        setPlayers(res)
      });
  }

  const searchCurrent2 = (e) => {
    if (resultVote !== undefined) {
      let h = resultVote.find(
        playerR => playerR.player === e
      )
      let result = h != null ? h.vote : " "
      return(result)
    }
  }

  useEffect(() => {
    getP();
  }, []);

  useEffect(() => {
    if (gameInfo !== undefined && gameInfo.phase !== "propose") {
      if (gameInfo.phase === 'vote' || gameInfo.phase === 'minister play' ||
          gameInfo.phase === 'spell play') {
        if (gameInfo.votes !== undefined) {
          setResultVote(gameInfo.votes)

          if (gameInfo.votes.length !== countVotes) {
            const alivePlayers = players.filter((item) => item.alive)
            setCountVotes([gameInfo.votes.length, alivePlayers.length])

            if(countVotes[0] === countVotes[1] && showResult[1] === 0) {
              setShowResult([true, 1])
              let head = players.find(
                  playerR => playerR.id === parseInt(gameInfo.headmaster)
              )
              let minister = players.find(
                  playerR => playerR.id === parseInt(gameInfo.minister)
              )
              setHeadM([head, minister])
              getP()
              setTimeout(
                () => setShowResult([false, 1]), 4500
              );
            }
          }
        }
      } else {
          setShowResult([false, 0])
          setCountVotes([0, -1])
          setHeadM([])
      }
    }
  }, [gameInfo]);


  return (
    <div>
      { showResult[0] ?
        <PopupVote open={true} headM={headM}>
        </PopupVote> : " "
      }
      {players.sort(
        function(a,b){
          var x = a.id < b.id? -1:1;
          return x
        }).map( player =>
          <div className="fom-popup-BoxShadow custom game"
            style={ player.alive ?
                {color: 'white'} :
                {background: '#672A24', fontWeight: 'bold',
                  fontSize: '20px', opacity: '0.4'}}
            key={player.id}>
            <div className="hDivPlayers cust">
              <div className="hDivPlayers votes">
                <li style={{fontWeight: 'bold'}}>
                  {
                    (() => {
                      if (gameInfo !== undefined) {
                        if (gameInfo.phase === 'vote') {
                          if (parseInt(gameInfo.headmaster) === player.id) {
                            return "CAND. HEADMASTER"
                          }
                          if (player.current_position === 'minister') {
                            return "CAND. MINISTER"
                          }
                        } else {
                            return (
                              (player.current_position) !== "" ?
                                (player.current_position).toUpperCase() :
                                <p> </p>
                            )
                        }
                      }
                  })()
                  }
                </li>
                <li style={player.alive ?
                    {color: 'white'} :
                    {fontWeight: 'bold', fontSize: '20px'}}>
                    {player.user.useralias}
                </li>
              </div>
              <div style={{}}>
                {
                  (() => {
                    if (resultVote !== "") {
                      let result = searchCurrent2(player.id)
                      if (result === true) {
                        return (
                          <img className="imgDivVote" src={lumos} alt="lumos"/>
                        )
                      } else if (result === " ") {
                        return (
                          <p> </p>
                        )
                      } else if (result === false) {
                        return (
                          <img className="imgDivVote" src={nox} alt="nox"/>
                        )
                      }
                    }
                })()
              }
              </div>
            </div>
          </div>
      )}
    </div>
  )
}
export default ShowResultVote
