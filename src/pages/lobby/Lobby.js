import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';
import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import configData from '../../config.json';
import Game from '../game/Game'
import './LobbyStyles.css'
import '../joinagame/styleSearch.css'

const LobbyPage = (props) => {
  const [listPlayers, setListPlayers] = useState([]);
  const [initPartida, setInitPartida]= useState(false);
  const [nameGame, setNameGame] = useState('')
  const [endGame, setEndGame]= useState(false);
  const [userCreate, setUserCreate] = useState(0);
  const [countPlayer, setCountPlayer]= useState(0);
  const [message, setMessage] = useState('');
  const [copySuccess, setCopySuccess] = useState('');
  const [copyState, setCopyState] = useState(false);

  let idGame = parseInt(props.location.state.gameId);

  var idPlayer = 0
  const usertoken = localStorage.getItem('user');
  if(usertoken) {
    idPlayer = jwt_decode(usertoken).sub.id;
  }

  useEffect(() => {
    const getPlayers = () => {
      axios.get(`${configData.API_URL}/games/${idGame}/players`, {
          headers: {
              'Authorization': `Bearer ${JSON.parse(usertoken).access_token}`
          }
      }).then(response => {
        if(response.status === 200){
          setListPlayers(response.data.data)
          setCountPlayer(response.data.data.length)
        }
      })
      .catch(error => {
        setEndGame(true)
      })
    }

    const timer = setInterval(() => {
      getPlayers();
      if (initPartida) {
        clearInterval(timer);
      }
    }, 2000);

    return () => clearInterval(timer)
  }, [initPartida])

  useEffect(() => {
    const getGameInfo = () => {
        axios.get(`${configData.API_URL}/games/${idGame}`, {
          headers: {
            'Authorization': `Bearer ${JSON.parse(usertoken).access_token}`
          }
        })
        .then(res => {
          if(res.status === 200) {
            setInitPartida(res.data.started)
            setUserCreate(res.data.created_by)
            setNameGame(res.data.name)
          }
        }).catch( error => {
          setEndGame(true)
        })
    }
    const timer = setInterval(() => {
      getGameInfo();
      if (initPartida) {
        clearInterval(timer);
      }
    }, 2000);

    return () => clearInterval(timer)
  }, [initPartida])

  const gameStart = () => {
    if (countPlayer >= 2) {
      axios.post(`${configData.API_URL}/games/${idGame}/start`,({}),{
        headers: {
          'Authorization': `Bearer ${JSON.parse(usertoken).access_token}`
        }
      }).catch(error => {
        console.log(error)
      })
    } else {
      setMessage("Insufficient players, the minimum is 5")
      setTimeout(
        () => setMessage(" "), 4500
      );
    }
  }

  const exitLobby = () => {
    if (idPlayer === userCreate) {
      endUserCreate()
    } else {
      axios.post(`${configData.API_URL}/games/${idGame}/exit`,({}),{
        headers: {
          'Authorization': `Bearer ${JSON.parse(usertoken).access_token}`
        }
      }).catch(error => {
        console.log(error)
      })
    }
  }

  const endUserCreate = () => {
    axios.delete(`${configData.API_URL}/games/${idGame}/delete`, {
      headers: {
        'Authorization': `Bearer ${JSON.parse(usertoken).access_token}`
      }
    }).then(response => {
      if(response.status === 200){
        setEndGame(true)
      }
    })
    .catch(error => {
      console.log(error)
    })
  }

  useEffect(() => {
    setCopySuccess(`http://localhost:3000/game/invite?game=${idGame}`)
  }, [idPlayer])

  const copyToClipboard = () => {
    console.log(copyState);
    setCopyState(!copyState)
    setTimeout(
      () => setCopyState(false), 1500
    );
  };

  return (
    <div>
      { endGame ? <Redirect to="/home" /> :
        ( initPartida ?
          <div>
            <Game gameId={parseInt(props.location.state.gameId)}/>
          </div>
          : <div>
              <div className="divContentTittle">
                <div className="divCreateJoin tittle">
                  <div className="topBar">
                    <div className="dropdown prim home back">
                      <button className="dropbtn">Menu
                        <i className="fa fa-caret-down"></i>
                      </button>
                      <div className="dropdown-content">
                        <div>
                          <Link
                            className="liStyle hom"
                            to="/home">
                            {'Home'}
                          </Link>
                        </div>
                        <div>
                          <Link
                            className="liStyle hom"
                            onClick={exitLobby}
                            to="/home">
                            Exit Game
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className={
                      "divContentTittle url" + (copyState ? ' copied' : '')
                    }
                    style={{resize: "none"}}>
                    <p className="pUrl">
                      Invite: {copySuccess}
                    </p>
                    <CopyToClipboard text={copySuccess}>
                      <button
                        onClick={copyToClipboard}
                        className="buttonInvi">
                        { copyState ? "Copied" : "Copy" }
                      </button>
                    </CopyToClipboard>
                  </div>

                </div>
              </div>

              <h1 className="h1TittleLobby title">Lobby {nameGame}</h1>
              <h4 className="h1TittleLobby error">{message}</h4>
              <div className="divCreateJoin lobby-1">
                {userCreate === idPlayer
                  ? <div className="button-container-1 button lobby">
                      <span className="mas">Start Game</span>
                      <button
                        id="work"
                        type="button"
                        name="Hover"
                        onClick={gameStart}>
                          Start Game
                      </button>
                    </div>
                  : <h3 className = "divWaiting">Waiting to start</h3>
                 }
              </div>
              <label>
              <div className="divCreateJoin lobby">
                { listPlayers.sort(
                    function (a,b) {
                      var x = a.id < b.id? -1:1;
                      return x
                    }).map( player =>
                      <li
                        key={player.user.id}
                        className="liStyle fom-popup-BoxShadow custom">
                          {player.user.username}
                      </li>
                  )}
              </div>
              </label>
          </div>
        )
      }
      </div>
  )
}
export default LobbyPage;
