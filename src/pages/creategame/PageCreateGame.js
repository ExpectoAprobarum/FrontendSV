import React, {useState} from 'react';
import axios from 'axios';
import {notify_gameName_invalid} 
  from '../../commons/alerts/toast';
import { Redirect } from 'react-router-dom';
import configData from '../../config.json';
import "./buttonStyle.css";
import "./pageCreateGame.css";

 
const PageCreateGame = () => {
    const [name, setName] = useState('');
    const [player_amount, setPlayer_amount] = useState();
    const [showMe, setShowMe] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [gameId, setIdgame] = useState("-1") ; 
    
    const onSubmit = (e) => {
      e.preventDefault();
      const infotosend ={
      name: name,
      player_amount: parseInt(player_amount)
      };
      const usertoken = localStorage.getItem('user')
      axios.post(configData.API_URL + '/games/', (infotosend), {
        headers: {
          'Authorization': `Bearer ${JSON.parse(usertoken).access_token}` 
        }
      }).then(response => { 
        if(response.status === 200){
          const response_id = response.data.id
          setIdgame(response_id)
          setRedirect(true)
        }
      })
      .catch(error => {
        notify_gameName_invalid()
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
        return <Redirect to={{
          pathname: '/game',
          state: {gameId}
        }} />
      }
        return( 
            <div> 
              <div className="button-container-1">
              <span className="mas">Are you ready ?</span>
              <button id="work" type="button" name="Hover"
                      onClick={showmetheElement}>
                Create a Game
              </button>
              </div> 
           {showMe ? 
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
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                    </select>
                    <br />
                    <br />
                    <button tpye='submit' value={redirect} name="redirect" 
                            className='SaveConfig'>
                      Save config
                    </button>
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