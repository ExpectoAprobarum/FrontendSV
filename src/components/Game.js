import axios from 'axios';
import React, { Component } from 'react';
import EmitProclamation from './game/EmitProclamation';
import configData from "../config.json";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameInfo: {
        id: 0,
        creation_date: 0,
        player_amount: 0,
        board: 0,
        players: [],
        started: false
      },
      gameStatus: {
        round: 0,
        phase: '',
        cards: [],
        minister: {
          user_id: 0,
          username: ''
        },
        headmaster: {
          user_id: 0,
          username: ''
        }
      }
    }

    this.getGameData = this.getGameData.bind(this);
    this.changeState = this.changeState.bind(this)
  }

  getGameData() {
    //Get game status data
    axios.get(configData.API_URL + '/games/' + this.props.gameId + '/status')
      .then(res => {
        let gameStatus = res.data;
        this.setState({
          gameStatus: gameStatus
        });

        setTimeout(this.getGameData, 2000)
      })
  }

  componentDidMount() {
    //Get game info data
    axios.get(configData.API_URL + '/games/' + this.props.gameId)
      .then(res => {
        let gameInfo = res.data;
        this.setState({
          gameInfo: gameInfo
        })
      });
    this.getGameData();
  }

  changeState() {
    let newStatus = this.state.gameStatus;
    newStatus.phase = 'EMIT_PROC';
    this.setState({
      gameStatus: newStatus
    })
  }

  render() {
    return (
      <div className="Game">
        <h1 className="center">Game phase: {this.state.gameStatus.phase}</h1>
        <button id="changeState" onClick={this.changeState}>
          Change to: emit proclamation phase
        </button>
        <EmitProclamation
          phase={this.state.gameStatus.phase}
          cards={this.state.gameStatus.cards}
          headmaster={this.state.gameStatus.headmaster.user_id}
          gameId={this.props.gameId}
        />
      </div>
    )
  }
}

export default Game;