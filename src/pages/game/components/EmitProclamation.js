import React, { Component } from 'react';
import axios from 'axios';
import configData from '../../../config.json';
import './EmitProclamation.css';

//props: phase, gameId, userId, headmaster (id)
class EmitProclamation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: {},
      cards: []
    }
  }

  getPlayerInfo = () => {
    const usertoken = localStorage.getItem('user');
    axios.get(configData.API_URL + '/games/' + this.props.gameId + '/me', {
      headers: {
          'Authorization': `Bearer ${JSON.parse(usertoken).access_token}` 
        }
      })
      .then(res => {
        if(res.status === 200) {
          let playerData = res.data
          this.setState({
            player: playerData
          })
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  getCards = () => {
    const usertoken = localStorage.getItem('user');
    axios.get(configData.API_URL + '/games/' + this.props.gameId + '/proclamations', {
      headers: {
          'Authorization': `Bearer ${JSON.parse(usertoken).access_token}` 
        }
      })
      .then(res => {
        if(res.status === 200) {
          let newCards = res.data.data;
          this.setState({
            cards: newCards
          })
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  choose = (e) => {
    let choice = e.target.className.split(' ')[0];
    const usertoken = localStorage.getItem('user');
    axios.post(configData.API_URL + '/games/' + this.props.gameId + '/proclamations',
      { card: choice }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(usertoken).access_token}` 
          }
        })
      .then(res => {
        if (res.status === 200) {
          console.log(res.status);
        }
      })
      .catch(error => {
        console.log(error)
      })

    document.getElementById("proc1").disabled = true;
    document.getElementById("proc2").disabled = true;
  }

  componentDidMount() {
    this.getPlayerInfo();
    this.getCards();
  }

  render() {
    return this.state.player.current_position === "headmaster" ? (
      <div className="proclam">
        <button className={this.state.cards[0] + " card left"} id="proc1" onClick={this.choose}></button>
        <button className={this.state.cards[1] + " card right"} id="proc2" onClick={this.choose}></button>
      </div>
    ) : (
      <p></p> 
    )
  }
}

export default EmitProclamation
