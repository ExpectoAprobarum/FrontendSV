import React, {Component} from 'react';
//import { connect } from 'react-redux';
//import {reduxForm, Field} from 'redux-form';
import axios from 'axios';
//instalar esta libreria
import { Redirect, useHistory} from 'react-router-dom';


 
class PageCreateGame extends Component {
    state = {
        name:'', 
        numberplayers: 5,
        showMe: false,
    }
    //esta funcion se encarga de hacer un post una vez apretado el boton.
    onSubmit = (e) => {
        e.preventDefault();
        //esto es lo que voy a enviar al back
        const infotosend ={
        name: this.state.name,
        numberplayers:this.state.numberplayers
        };
        
        console.log(this.state.name)
        axios.post('https://jsonplaceholder.typicode.com/todos', {infotosend}).then(response => {
            console.log(response)
        if(response.status === 201){
            //aca deberia hacer algo si esta todo bien(?)
            window.location = "/Lobby";
           }
        })
        .catch(error => {
            console.log(error)
        })
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
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
                        <br />
                        <br />
                        <input 
                        type='text' 
                        name="name"
                        onChange={this.onChange} 
                        value ={this.state.name}/>
                            <br/>
                            <br/>
                            <label>Number Of Players: </label>
                            <select
                                name="numberplayers"
                                value={this.state.number}
                                onChange={this.onChange}
                                >
                                <option value="5">5</option>
                                <option value="7">7</option>
                                <option value="9">9</option>
                            </select>
                            <br />
                            <br />
                        <button tpye ='submit'>Save config</button>
                    </form>
                </div>
            </div>   
            :
            <p></p>
            }
            </div>
             
        )
    }
}

export default PageCreateGame;