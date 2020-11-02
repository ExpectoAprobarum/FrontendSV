import React, { Component } from 'react';
import axios from 'axios';
import configData from '../../../config.json';
import './EmitProclamation.css';

//props: phase, gameId, userId, headmaster (id)
class EmitProclamation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headmaster: false,
      cards: []
    }
  }

  getCards = () => {
    axios.get(configData.API_URL + '/games/' + this.props.gameId + '/proclamations')
      .then(res => {
        if(res.status === 200) {
          let newCards = res.data;
          this.setState({
            cards: newCards
          })
        }
      })
  }

  choose = (e) => {
    let choice = e.target.className.split(' ')[0];
    console.log("choice", choice);
    axios.post(configData.API_URL + '/games/' + this.props.gameId + '/proclamations',
      { proclamation: choice } )
      .then(res => {
        if (res.status === 200) {
          console.log(res.status);
        }
      }
    );
    document.getElementById("proc1").disabled = true;
    document.getElementById("proc2").disabled = true;
  }

  componentDidMount() {
    this.getCards();
    let isHeadmaster = this.props.userId === this.props.headmaster;
    this.setState({
      headmaster: isHeadmaster
    })
  }

  render() {
    return this.props.phase === 'headmasterPlay' && this.state.headmaster ? (
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
