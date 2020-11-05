import React, {useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // prueba
import Game from '../game/Game'
import './LobbyStyles.css'
import '../joinagame/styleSearch.css'

const LobbyPage = () => {
    // constructor(props) {
    //     super(props);
    //     this.state = {
            const [listPlayers, setListPlayers] = useState([]);
            const [initPartida, setInitPartida]= useState(false);
            const [countPlayer, setCountPlayer]= useState(0);
            const [message, setMessage] = useState('');
    //     };
    // }

    const getPlayers = () => {
      const usertoken = localStorage.getItem('user')
      axios.get(`http://127.0.0.1:8000/games/${this.props.location.state.gameId}/players`, {
          headers: {
              'Authorization': `Bearer ${JSON.parse(usertoken).access_token}`
          }
      }).then(response => {
        if(response.status === 200){
          setListPlayers(response.data.data)
          setCountPlayer(response.data.data.length)
        }
        setTimeout(getPlayers, 2000)
      })
      .catch(error => {
        console.log(error)
      })
    }

    // const run () => {
    //   getGameInfo
    //   getPlayers
    // }
    var compo = () => {
      console.log("LALA")
      getGameInfo
      getPlayers
    }

    compo()

    const getGameInfo = () => {
      const usertoken = localStorage.getItem('user')
        axios.get(`http://127.0.0.1:8000/games/${this.props.location.state.gameId}`, {
            headers: {
                'Authorization': `Bearer ${JSON.parse(usertoken).access_token}`
            }
        })
        .then(res => {
          if(res.status === 200) {
            setInitPartida(res.data.started)
            setTimeout(getGameInfo, 2000)
          }
        })
    }

    const gameStart = () => {
        if (countPlayer >= 5) {
            const idPart = parseInt(this.props.location.state.gameId)
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
              () => setMessage(" ")
                , 4000
            );
        }
    }

    return (
      <div>
        { initPartida ?
          <div><Game gameId={parseInt(this.props.location.state.gameId)}/></div>
          : <div>
                <div className="divCreateJoin lobby">
                    <Link className="liStyle back" to="/home">{`<`}</Link>
                </div>

                <h1 className="h1TittleLobby" style={{fontSize:"70px"}}>Lobby</h1>
                <h4 className="h1TittleLobby" style={{fontSize:"20px", color: "red"}}>{message}</h4>
                <div className="divCreateJoin lobby-1">
                    <div className="button-container-1 button lobby">
                        <span className="mas">Start Game</span>
                        <button id="work" type="button" name="Hover" onClick={gameStart}>
                            Start Game
                        </button>
                    </div>
                </div>
                <label>
                <div className="divCreateJoin lobby">
                        { listPlayers.map(
                                    player =>
                                            <li key={player.user.id} className="liStyle fom-popup-BoxShadow custom">
                                                {player.user.username}
                                            </li>
                        )}
                </div>
                </label>
            </div>
        }
      </div>

        // if (initPartida) {
        //     <div><Game gameId={parseInt(this.props.location.state.gameId)}/></div>
        // } else {
        //     <div>
        //         <div className="divCreateJoin lobby">
        //             <Link className="liStyle back" to="/home">{`<`}</Link>
        //         </div>
        //
        //         <h1 className="h1TittleLobby" style={{fontSize:"70px"}}>Lobby</h1>
        //         <h4 className="h1TittleLobby" style={{fontSize:"20px", color: "red"}}>{message}</h4>
        //         <div className="divCreateJoin lobby-1">
        //             <div className="button-container-1 button lobby">
        //                 <span className="mas">Start Game</span>
        //                 <button id="work" type="button" name="Hover" onClick={gameStart}>
        //                     Start Game
        //                 </button>
        //             </div>
        //         </div>
        //         <label>
        //         <div className="divCreateJoin lobby">
        //                 { listPlayers.map(
        //                             player =>
        //                                     <li key={player.user.id} className="liStyle fom-popup-BoxShadow custom">
        //                                         {player.user.username}
        //                                     </li>
        //                 )}
        //         </div>
        //         </label>
        //         {/* <button className="buttonFound bttmodal bttLobby" onClick={this.gameStart}>Iniciar Partida</button> */}
        //     </div>
        // }
    )
}
export default LobbyPage;
