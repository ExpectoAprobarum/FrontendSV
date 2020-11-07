import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // prueba
import jwt_decode from 'jwt-decode';
import Game from '../game/Game'
import './LobbyStyles.css'
import '../joinagame/styleSearch.css'

const LobbyPage = (props) => {
  const [listPlayers, setListPlayers] = useState([]);
  const [initPartida, setInitPartida]= useState(false);
  const [userCreate, setUserCreate] = useState(0);
  const [countPlayer, setCountPlayer]= useState(0);
  const [message, setMessage] = useState('');

  var idPlayer = 0
  const usertoken = localStorage.getItem('user');
  if(usertoken) {
    idPlayer = jwt_decode(usertoken).sub.id;
  }

  useEffect(() => {
    const getPlayers = () => {
      const usertoken = localStorage.getItem('user')
      axios.get(`http://127.0.0.1:8000/games/${props.location.state.gameId}/players`, {
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
    }, 2000);

    return () => clearInterval(timer)
  }, [props.location.state.gameId], {listPlayers})

  useEffect(() => {
    const getGameInfo = () => {
      const usertoken = localStorage.getItem('user')
        axios.get(`http://127.0.0.1:8000/games/${props.location.state.gameId}`, {
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
    }, 2000);

    return () => clearInterval(timer)
  }, [props.location.state.gameId, initPartida])

  const gameStart = () => {
    if (countPlayer >= 2) {
      const idPart = parseInt(props.location.state.gameId)
      const usertoken = localStorage.getItem('user')

      axios.post(`http://127.0.0.1:8000/games/${idPart}/start`,({}),{
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

    axios.post(`http://127.0.0.1:8000/games/${idPart}/exit`,({}),{
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
            <div className="divCreateJoin lobby">
              <Link className="liStyle back" to="/home"
                onClick={exitLobby}>{`<`}</Link>
            </div>

            <h1 className="h1TittleLobby tittle">Lobby</h1>
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
