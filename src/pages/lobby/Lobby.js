import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // prueba
import Game from '../game/Game'
import './LobbyStyles.css'
import '../joinagame/styleSearch.css'

export default class LobbyPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listPlayers: [],
            initPartida: false,
        };
    }

    getPlayers = () => {
      console.log("passing: ", this.props.location.state.gameId)
        const usertoken = localStorage.getItem('user')
        axios.get(`http://127.0.0.1:8000/games/${this.props.location.state.gameId}/players`, {
            headers: {
                'Authorization': `Bearer ${JSON.parse(usertoken).access_token}` 
            }
        }).then(response => { 
            console.log("response:", response)
            console.log("status:", response.status)
            if(response.status === 200){
                this.setState({
                    listPlayers: response.data.data,
                });
            }

            setTimeout(this.getPlayers, 2000)
        })
        .catch(error => {
           console.log(error)
        })
    }

    componentDidMount() {
        this.getGameInfo();
        this.getPlayers();
    };

    getGameInfo = () => {
      const usertoken = localStorage.getItem('user')
        axios.get(`http://127.0.0.1:8000/games/${this.props.location.state.gameId}`, {
            headers: {
                'Authorization': `Bearer ${JSON.parse(usertoken).access_token}` 
            }
        })
        .then(res => {
          if(res.status === 200) {
            this.setState({
              initPartida: res.data.started
            })

            setTimeout(this.getGameInfo, 2000)
          }
        })
    }

    gameStart = () => {
        console.log("IDPART: ", parseInt(this.props.location.state.gameId))
        const idPart = parseInt(this.props.location.state.gameId)
        const usertoken = localStorage.getItem('user')

        console.log("token: ", JSON.parse(usertoken).access_token)
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
    }

    render() {
        if (this.state.initPartida) {
            return <div><Game gameId={parseInt(this.props.location.state.gameId)}/></div>
        }
        return (
            <div>
                <div className="divCreateJoin lobby">
                    <Link className="liStyle back" to="/home">{`<`}</Link>
                </div>
                
                <h1 className="h1TittleLobby" style={{fontSize:"70px"}}>Lobby</h1>
                <div className="divCreateJoin lobby-1">
                    <div className="button-container-1 button lobby">
                        <span className="mas">Start Game</span>
                        <button id="work" type="button" name="Hover" onClick={this.gameStart}>
                            Start Game
                        </button>
                    </div> 
                </div>
                <label>
                <div className="divCreateJoin lobby">
                        { this.state.listPlayers.map(
                                    player =>
                                            <li key={player.user.id} className="liStyle fom-popup-BoxShadow custom">
                                                {player.user.username}
                                            </li>
                        )}
                </div>
                </label>
                {/* <button className="buttonFound bttmodal bttLobby" onClick={this.gameStart}>Iniciar Partida</button> */}
            </div>
        );
    }
}