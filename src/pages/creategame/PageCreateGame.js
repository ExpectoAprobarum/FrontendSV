import React, {useState} from 'react';
import axios from 'axios';
import "./buttonStyle.css";
import { Redirect } from 'react-router-dom';

 
const PageCreateGame = () => {
    //necesito un atributo showme en el estado para poder mostrar todo este componente cdo se toca un boton.
    const [name, setName] = useState('');
    const [player_amount, setPlayer_amount] = useState(5);
    const [showMe, setShowMe] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [gameId, setIdgame] = useState("-1") ; 
    
    //esta funcion se encarga de hacer un post una vez apretado el boton.
    const onSubmit = (e) => {
        e.preventDefault();
        //esto es lo que voy a enviar al back
        const infotosend ={
        name: name,
        player_amount: parseInt(player_amount)
        };
        const usertoken = localStorage.getItem('user')
        axios.post('http://127.0.0.1:8000/games/',(infotosend), {
            headers: {
                'Authorization': `Bearer ${JSON.parse(usertoken).access_token}` 
            }
        }).then(response => { 
            if(response.status === 200){
                const response_id = response.data.id
                setIdgame(response_id)
                console.log("idCorrecto:", response_id)
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
        
    //mando la id a /game
        if(redirect){ 
            return <Redirect to={{
                pathname: '/Game',
                state: {gameId}
            }} />
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
            </div>
             
        )
}

export default PageCreateGame;