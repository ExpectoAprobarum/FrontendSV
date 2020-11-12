import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // prueba
import jwt_decode from 'jwt-decode';
import configData from '../../config.json';
import Game from '../game/Game'
import './LobbyStyles.css'
import '../joinagame/styleSearch.css'

const LobbyPage = (props) => {
  const [listPlayers, setListPlayers] = useState([]);
  const [initPartida, setInitPartida]= useState(false);
  const [userCreate, setUserCreate] = useState(0);
  const [countPlayer, setCountPlayer]= useState(0);
  const [message, setMessage] = useState('');

  let idGame = props.location.state.gameId;

  var idPlayer = 0
  const usertoken = localStorage.getItem('user');
  if(usertoken) {
    idPlayer = jwt_decode(usertoken).sub.id;
  }

  useEffect(() => {
    const getPlayers = () => {
      const usertoken = localStorage.getItem('user')
      axios.get(`${configData.API_URL}/games/${props.location.state.gameId}/players`, {
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
        console.log(error)
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
      const usertoken = localStorage.getItem('user')
        axios.get(`${configData.API_URL}/games/${props.location.state.gameId}`, {
          headers: {
            'Authorization': `Bearer ${JSON.parse(usertoken).access_token}`
          }
        })
        .then(res => {
          if(res.status === 200) {
            setInitPartida(res.data.started)
            setUserCreate(res.data.created_by)
          }
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
    if (countPlayer >= 5) {
      const idPart = parseInt(props.location.state.gameId)
      const usertoken = localStorage.getItem('user')

      axios.post(`${configData.API_URL}/games/${idPart}/start`,({}),{
        headers: {
          'Authorization': `Bearer ${JSON.parse(usertoken).access_token}`
        }
      }).then(response => {
        if(response.status === 200){
          console.log("Game started")
        }
      })
      .catch(error => {
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
    const idPart = parseInt(props.location.state.gameId)
    const usertoken = localStorage.getItem('user')

    axios.post(`${configData.API_URL}/games/${idPart}/exit`,({}),{
      headers: {
        'Authorization': `Bearer ${JSON.parse(usertoken).access_token}`
      }
    }).then(response => {
      if(response.status === 200){
        console.log("Game Exit")
      }
    })
    .catch(error => {
      console.log(error)
    })
  }

  return (
    <div>
      { initPartida ?
        <div><Game gameId={parseInt(props.location.state.gameId)}/></div>
        : <div>
            <div className="divContentTittle">
              <div className="divCreateJoin tittle">
                <Link className="liStyle back" to="/home"
                  onClick={exitLobby}>{`<`}</Link>
                <p className="parrafo">
                  Invite URL:
                  {` http://localhost:3000/Game/invite?game=${idGame}`}</p>
              </div>
            </div>

            <h1 className="h1TittleLobby">Lobby</h1>
            <h4 className="h1TittleLobby error">{message}</h4>
            <div className="divCreateJoin lobby-1">
              {userCreate === idPlayer ?
                <div className="button-container-1 button lobby">
                  <span className="mas">Start Game</span>
                  <button id="work" type="button"
                    name="Hover" onClick={gameStart}>
                      Start Game
                  </button>
                </div> : <h3 className = "divWaiting">Waiting to start</h3>
               }
            </div>
            <label>
            <div className="divCreateJoin lobby">
              {listPlayers.sort(
                function(a,b){
                  var x = a.id < b.id? -1:1;
                  return x
                }).map( player =>
                  <li key={player.user.id}
                    className="liStyle fom-popup-BoxShadow custom">
                      {player.user.username}
                  </li>
              )}
            </div>
            </label>
        </div>
      }
    </div>
  )
}
export default LobbyPage;
