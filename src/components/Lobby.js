import React from 'react';
import axios from 'axios';
import { Link, BrowserRouter, Route, Redirect } from 'react-router-dom'; // prueba
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
        };
    }

    componentDid = () => {
        console.log(this.props.gameID)
        <Redirect />
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
                <Link to={`/game/`}>
                    <button className="buttonFound bttmodal bttLobby" onClick={this.componentDid}>Iniciar Partida</button>
                </Link>
            </div>
        );
    }
}