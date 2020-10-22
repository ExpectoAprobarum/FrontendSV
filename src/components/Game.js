import React, { Component } from 'react';
import Vote from './game/Vote';

class Game extends Component {
  state = {
    gameState: 1
  }
  render() {
    return (
      <div className="Game">
        <Vote gameState={this.state.gameState}/>
      </div>
    )
  }
}

export default Game;