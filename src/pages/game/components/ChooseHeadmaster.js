import React, { Component } from 'react';
import axios from 'axios';
import configData from '../../../config.json';
import Players from './Players';

class ChooseHeadmaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      selected: 0
    }

    this.selectPlayer = this.selectPlayer.bind(this);
    this.getPlayers = this.getPlayers.bind(this);
  }

  getPlayers = () => {
    axios.get(configData.API_URL + '/games/' + this.props.gameId + '/players')
      .then(res => {
        this.setState({
          players: res.data
        })
      });
  }

  selectPlayer = (id) => {
    this.setState({
      selected: id
    })
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
    return this.props.phase === 'propose' ? (
      <div className="ChooseHeadmaster">
        <Players
          selectPlayer={this.selectPlayer}
          players={this.state.players}
          selected={this.state.selected}
        />
        <button className="sendCandidate" onClick={this.sendElection}>Send</button>
      </div>
    ) : (
      <p></p>
    );
  }
}

export default ChooseHeadmaster
