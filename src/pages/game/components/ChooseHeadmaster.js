import React, { Component } from 'react';
import axios from 'axios';
import configData from '../../../config.json';
import Players from './Players';
import './ChooseHeadmaster.css';

class ChooseHeadmaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minister: false,
      players: [],
      selected: 0
    }

    this.selectPlayer = this.selectPlayer.bind(this);
    this.getPlayers = this.getPlayers.bind(this);
    this.sendElection = this.sendElection.bind(this);
  }

  getPlayers = () => {
    axios.get(configData.API_URL + '/games/' + this.props.gameId + '/players')
      .then(res => {
        this.setState({
          players: res.data
        });
        let minister = res.data.filter(player => {
          return player.current_position === 'minister'
        });
        let isMinister = minister.id === this.props.userId;
        this.setState({
          minister: isMinister
        })
      }) 
  }

  selectPlayer = (id) => {
    this.setState({
      selected: id
    });
    document.getElementById("sendCandidate").disabled = false
  }

  sendElection = (id) => {
    axios.post(configData.API_URL + '/turn/' + this.props.gameId + '/choosehm', 
    this.state.selected
    ).then(res => {
        console.log(res.data)
      })
  }

  componentDidMount() {
    this.getPlayers();
  }

  render() {
    return this.props.phase === 'propose' && this.state.minister ? (
      <div className="ChooseHeadmaster">
        <h1 className="header">Select new headmaster candidate</h1>
        <Players
          selectPlayer={this.selectPlayer}
          players={this.state.players}
          selected={this.state.selected}
        />
        <button className="sendCandidate" id="sendCandidate" onClick={this.sendElection} disabled>Choose</button>
      </div>
    ) : (
      <p></p>
    );
  }
}

export default ChooseHeadmaster