import React from 'react';
import axios from 'axios';
import Game from '../game/Game'
import './LobbyStyles.css'
import '../joinagame/styleSearch.css'

const liStyle = {
    paddingLeft: '45px', 
    listStyleType: "none", 
};

export default class LobbyPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listPlayers: [],
            initPartida: false,
        };
    }

    componentDidMount() {
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
            console.log("List: ", this.state.listPlayers)
        })
        .catch(error => {
           console.log(error)
        })
    };

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
                this.setState({
                    initPartida: true
                })
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
                <h1 className="h1TittleLobby">Lobby</h1>
                <label>
                    <form>
                        { this.state.listPlayers.map(
                                    player =>
                                            <li key={player.user.id} style={liStyle} className="fom-popup-BoxShadow">
                                                {player.user.username}
                                            </li>
                        )}
                    </form>
                </label>
                <button className="buttonFound bttmodal bttLobby" onClick={this.gameStart}>Iniciar Partida</button>
            </div>
        );
    }
}