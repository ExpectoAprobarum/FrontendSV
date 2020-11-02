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

    LobbyTransition = () => {
        console.log("Entre al boton")
        this.setState({
            initPartida: true
        })
    }

    componentDidMount() {
        console.log("Entre")
        const usertoken = localStorage.getItem('user')
        axios.get(`http://127.0.0.1:8000/games/${this.props.location.aboutProps.gameId}/players`, {
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

    render() {
        if (this.state.initPartida) {
            return <div><Game gameId={this.props.location.aboutProps.gameId}/></div>
        }
        return (
            <div>
                <h1 className="h1TittleLobby">Lobby</h1>
                <label>
                    <form>
                        {/* { this.state.listPlayers.map(
                                    player =>
                                            <li key={player.id} style={liStyle} className="fom-popup-BoxShadow">
                                                {player.id} <span style={{paddingLeft: '15px'}}> </span>{player.name}
                                            </li>
                        )} */}
                    </form>
                </label>
                <button className="buttonFound bttmodal bttLobby" onClick={this.LobbyTransition}>Iniciar Partida</button>
            </div>
        );
    }
}