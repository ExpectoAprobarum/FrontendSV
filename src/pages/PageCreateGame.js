import React, {useState} from 'react';
//instalar esta libreria
import axios from 'axios';
import "./buttonStyle.css";
import { Redirect } from 'react-router-dom';
import PersonList from '../components/Lists'

 
const PageCreateGame = () => {
    //necesito un atributo showme en el estado para poder mostrar todo este componente cdo se toca un boton.
    const [name, setName] = useState('');
    const [player_amount, setPlayer_amount] = useState(5);
    const [showMe, setShowMe] = useState(false);
    const [redirect, setRedirect] = useState(false);
       
    //esta funcion se encarga de hacer un post una vez apretado el boton.
    const onSubmit = (e) => {
        e.preventDefault();
        //esto es lo que voy a enviar al back
        const infotosend ={
        name: name,
        player_amount: player_amount
        };
        
        console.log(name)
        axios.post('https://jsonplaceholder.typicode.com/todos', {infotosend}).then(response => { 
            if(response.status === 201){
                //aca deberia hacer algo si esta todo bien(?).
            console.log(response) 
            setRedirect(true)
            }
        })
        .catch(error => {
           console.log(error)
        })
    }
    
    const onChange = (e) => {
        if(e.target.name === 'name'){
            setName(e.target.value)
        }
        else if(e.target.name === 'player_amount'){
            setPlayer_amount(e.target.value)
        }
        
    }
    const showmetheElement = () => {
        setShowMe(! showMe)
    }
        
        if(redirect){ 
            console.log("Entre")
            return <Redirect to="/Lobby" />
        }
        return( 
            <div> 
                <div className="button-container-1">
                <span className="mas">Are you ready ?</span>
                <button id="work" type="button" name="Hover" onClick={showmetheElement}>
                 Create a Game
                </button>
                </div> 
           { showMe ? 
            <div className='Example'>
                <div>
                    <form onSubmit={onSubmit}>
                        <br />
                        <br />
                        <label>Game Name: </label>
                        <input 
                        type='text' 
                        name="name"
                        onChange={onChange} 
                        value ={name}/>
                            <br/>
                            <br/>
                            <label>Number Of Players: </label>
                            <select
                                name="player_amount"
                                value={player_amount}
                                onChange={onChange}
                            >
                                <option value="5">5</option>
                                <option value="7">7</option>
                                <option value="9">9</option>
                            </select>
                            <br />
                            <br />
                        <button tpye ='submit' value={redirect} name="redirect">Save config</button>
                    </form>
                </div>
            </div>   
            :
            <p></p>
            }

            <PersonList /> 
            </div>
             
        )
}

export default PageCreateGame;