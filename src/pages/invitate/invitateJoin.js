import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom'; // prueba
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const InvitateJoin = ({gameJoin}) => {
  const [initPartida, setInitPartida] = useState(false);
  const [gameInfo, setGameInfo] = useState([]);
  const [countPlayer, setCountPlayer] = useState(0);
  const [error, setError] = useState([false, '']);
  const [listPlayers, setListPlayers] = useState([]);

  var idPlayer = 0
  const usertoken = localStorage.getItem('user');
  if(usertoken) {
    idPlayer = jwt_decode(usertoken).sub.id;
  }

  const getPlayers = (e) => {
      axios.get(`http://127.0.0.1:8000/games/${gameJoin}/players`, {
        headers: {
          'Authorization': `Bearer ${JSON.parse(usertoken).access_token}`
        }
      }).then(response => {
        if(response.status === 200){
          setCountPlayer(response.data.data.length)
          setListPlayers(response.data.data)
          let lengthGame = response.data.data.length
          let maxPlayerG = e.player_amount

          let doIExist = [response.data.data.find(
                            player => player.user.id === idPlayer)]
                         .includes(undefined)

          if (lengthGame === maxPlayerG) {
            if (e.created_by !== idPlayer && doIExist) {
              setError([true, "Full room"])
            }
          }
        }
      }).catch(error => {
        if (error) {
          console.log("Error 401 Player");
        }
      })
  }

  useEffect(() => {
    let join = usertoken !== null
    let init = false
    if (join) {
      const getGameInfo = () => {
        const usertoken = localStorage.getItem('user')
        axios.get(`http://127.0.0.1:8000/games/${gameJoin}`, {
          headers: {
            'Authorization': `Bearer ${JSON.parse(usertoken).access_token}`
          }
        })
        .then(res => {
          // console.log(res)
          if(res.status === 200) {
            setGameInfo(res.data)
            setInitPartida(res.data.started)

            init = res.data.started
            getPlayers(res.data)
            if (init) {
              setError([true, "Game stated"])
            }
          }
        }).catch(error => {
          if (error) {
            console.log("Error 401 Info");
          }
        });
      }
      getGameInfo()
    }
  },[initPartida])

  const jGame = () => {
    let join = usertoken !== null
    if (join) {
      let lengthGame = countPlayer
      let maxPlayerG = gameInfo.player_amount
      let doIExist = [listPlayers.find(
                        player => player.user.id === idPlayer)]
                     .includes(undefined)

      if (lengthGame !== maxPlayerG) {
        if (gameInfo.created_by !== idPlayer && doIExist) {
          const usertoken = localStorage.getItem('user')

          axios.post(`http://127.0.0.1:8000/games/${gameJoin}/join`,({}),{
            headers: {
              'Authorization': `Bearer ${JSON.parse(usertoken).access_token}`
            }
          }).then(response => {
            if (response.status === 200) {
              const response_id = response.data
              console.log(response_id);
            }
          })
          .catch(error => {
            console.log(error)
          })
        }
      }
    }
  }

  return (
    <div>
      <div className="modal">
          <div className="modal-main">
            <div>
              <h2>{`Game: ${gameInfo.name}`}</h2>
              <p>{`Players: ${countPlayer}/${gameInfo.player_amount}`}</p>
              <p className= "pCustom" style={{fontSize:"18px", color: "red"}}>
                {error[0] ? error[1] : "_"}
              </p>
              <div style={{paddingTop: "18px"}}>
                { error[0] ?
                  ""
                  : (<button className="buttonFound bttmodal" onClick={jGame}>
                        <Link className="linked" to={{
                            pathname: '/Game',
                            state: {
                                gameId: gameJoin
                            }
                        }}>Unirse</Link>
                      </button>)
                }
                <button className="buttonFound bttmodal">
                  <Link className="linked" to={{
                      pathname: '/home',
                      state: {
                          gameId: gameJoin
                      }
                  }}>Close</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}
export default InvitateJoin;
