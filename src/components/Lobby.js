import React from 'react';
import axios from 'axios';
import { Link, BrowserRouter, Route, Redirect } from 'react-router-dom'; // prueba
import Game from '../components/Game'
import PersonList from '../components/Lists'
import '../css/LobbyStyles.css'
import '../css/styleSearch.css'

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
        const URL = `https://jsonplaceholder.typicode.com/users`;
        axios.get(URL)
            .then(res => {
                this.setState({ 
                    listPlayers: res.data,
                });
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
                        { this.state.listPlayers.map(
                                    player =>
                                            <li key={player.id} style={liStyle} className="fom-popup-BoxShadow">
                                                {player.id} <span style={{paddingLeft: '15px'}}> </span>{player.name}
                                            </li>
                        )}
                    </form>
                </label>
                <button className="buttonFound bttmodal bttLobby" onClick={this.LobbyTransition}>Iniciar Partida</button>
            </div>
        );
    }
}