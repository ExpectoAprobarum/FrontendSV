import EmitProclamation from './components/EmitProclamation';
import React, { Component } from 'react';
import axios from 'axios';
import Vote from './components/Vote';
import configData from '../../config.json';
import jwt_decode from 'jwt-decode';


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
      },
      userId: 0
    }
    
    this.getGameData = this.getGameData.bind(this);
    this.changeStateProc = this.changeStateProc.bind(this)
    this.changeStateVote = this.changeStateVote.bind(this)
  }

  getGameData() {
    //Get game status data
    console.log(this.props.gameId)
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
    //Get userId from localStore
    const usertoken = localStorage.getItem('user');
    if(usertoken) {
      const id = jwt_decode(usertoken).sub.id;
      this.setState({
        userId: id
      })
    }
    //Get game info data
    axios.get(configData.API_URL + '/games/' + this.props.gameId)
      .then(res => {
        let gameInfo = res.data;
        this.setState({
          gameInfo: gameInfo
        })
      });
    //Get status info data
    this.getGameData();
  }

  changeStateProc() {
    let newStatus = this.state.gameStatus;
    newStatus.phase = 'headmasterPlay';
    this.setState({
      gameStatus: newStatus
    })
  }  

  changeStateVote() {
    let newStatus = this.state.gameStatus;
    newStatus.phase = 'vote';
    this.setState({
      gameStatus: newStatus
    })
  }

  render() {
    return (
      <div className="Game">
        <h1 className="center">Game phase: {this.state.gameStatus.phase}</h1>
        <button id="changeStateVote" onClick={this.changeStateVote}>Change to: vote phase</button>  
        <button id="changeStateProc" onClick={this.changeStateProc}>
            Change to: emit proclamation phase
        </button>

        <EmitProclamation
          phase={this.state.gameStatus.phase}
          headmasterId={this.state.gameStatus.headmaster.user_id}
          userId={this.state.userId}
          gameId={this.props.gameId}
        />
        <Vote phase={this.state.gameStatus.phase}/>
      </div>
    )
  }
}

export default Game
