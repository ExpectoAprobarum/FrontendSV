import React, { Component } from 'react';
import axios from 'axios';
import Vote from './components/Vote';
import EmitProclamation from './components/EmitProclamation';
import ChooseHeadmaster from './components/ChooseHeadmaster';
import configData from '../../config.json';
import jwt_decode from 'jwt-decode';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameInfo: {},
      gameStatus: {},
      userId: 0
    }
    
    this.getGameData = this.getGameData.bind(this);
    this.changeStatePropose = this.changeStatePropose.bind(this);
    this.changeStateProc = this.changeStateProc.bind(this);
    this.changeStateVote = this.changeStateVote.bind(this)
  }

  getGameData() {
    //Get game status data
    const usertoken = localStorage.getItem('user');
    axios.get(configData.API_URL + '/games/' + this.props.gameId + '/status', {
      headers: {
          'Authorization': `Bearer ${JSON.parse(usertoken).access_token}` 
        }
      })
      .then(res => {
        if(res.status === 200) {
          let gameStatus = res.data;
          this.setState({
            gameStatus: gameStatus
          })
        }

        setTimeout(this.getGameData, 2000)
      })
      .catch(error => {
        console.log(error)
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
    axios.get(configData.API_URL + '/games/' + this.props.gameId, {
      headers: {
          'Authorization': `Bearer ${JSON.parse(usertoken).access_token}` 
        }
      })
      .then(res => {
        if(res.status === 200) {
          let gameInfo = res.data;
          this.setState({
            gameInfo: gameInfo
          })
        }
      })
      .catch(error => {
        console.log(error)
      })
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

  changeStatePropose() {
    let newStatus = this.state.gameStatus;
    newStatus.phase = 'propose'

    this.setState({
      gameStatus: newStatus
    })
  }

  render() {
    if(this.state.gameStatus.phase === 'propose') {
      return(
        <div className="Game">
          <h1 className="center">Game phase: {this.state.gameStatus.phase}</h1>    
          <ChooseHeadmaster
            phase={this.state.gameStatus.phase}
            ministerId={this.state.gameStatus.minister}
            userId={this.state.userId}
            gameId={this.props.gameId}
          />
        </div>
      )
    }
    else if(this.state.gameStatus.phase === 'vote') {
      return(
        <div className="Game">
          <h1 className="center">Game phase: {this.state.gameStatus.phase}</h1> 
          <Vote
            phase={this.state.gameStatus.phase}
          />
        </div>
      )
    }
    else if(this.state.gameStatus.phase === 'headmasterPlay') {
      return(
        <div className="Game">
          <h1 className="center">Game phase: {this.state.gameStatus.phase}</h1>    
          <EmitProclamation
            phase={this.state.gameStatus.phase}
            headmasterId={this.state.gameStatus.headmaster}
            userId={this.state.userId}
            gameId={this.props.gameId}
          />
        </div>
      )
    }
    else {
      return <p></p>
    }
  }
}

export default Game
