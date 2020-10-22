import React, {Component} from 'react';
//import { connect } from 'react-redux';
//import {reduxForm, Field} from 'redux-form';
//import axios from 'axios';
//instalar esta libreria
import {BrowserRouter as Router, Route, Link, useHistory} from 'react-router-dom';


function LobbyButton() {
    const history = useHistory();
    function handleClick() {
      history.push("/Lobby");
    }
    return (
      <button type="button" onClick={handleClick}>
        go to lobby
      </button>
    );
  }

class PageCreateGame extends Component {
    state = {
        name:'', 
        numberplayers: 5,
        showMe: false,
    }
    onSubmit = (e) => {
        e.preventDefault();
        /*
        axios.post('https://jsonplaceholder.typicode.com/todos', this.state).then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })*/
    }
    onChange = (e) => {
        this.setState({
            name: e.target.value
        })
    }
    showmetheElement = () => {
        this.setState({
            showMe: !this.state.showMe
        })
    }
    
    render(){
        return( 
            <div>
            <button onClick={this.showmetheElement}>Create a Game</button>
            
           { this.state.showMe ?
            <div className='Example'>
                <div>
                    <form onSubmit={this.onSubmit}>
                        <input 
                        type='text' 
                        placeholder='Write a game name'
                        onChange={this.onChange} 
                        value ={this.state.name}/>
                            <br/>
                            <br/>
                        <p>Number of players:</p>
                        
                        <input type='checkbox'/>5 players  // aca deberia considerar mas casos de playrs
                            <br/>
                            <br/>
                        <LobbyButton/>
                        <button tpye ='submit'>Save config</button>
                    </form>
                </div>
            </div>
            : <h1></h1>   
            }
            </div>
             
        )
    }
}

export default PageCreateGame;