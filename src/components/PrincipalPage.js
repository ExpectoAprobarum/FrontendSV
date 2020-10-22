import React, {Component} from 'react';

class PrincipalPage extends Component{
    state = {
        ShowCreateGame:false,
    }
    handleClick () {
        this.setState({
            ShowCreateGame: !this.state.ShowCreateGame
        });
    }

    render() {
        return(
            <div>
                <button onClick={this.handleClick}>CreateGame</button>
            </div>)
    }


}

export default PrincipalPage;