import React,{useState, useEffect} from 'react';
import axios from 'axios';
import configData from '../../../config.json';
import {notify_you_dead } from '../../../commons/alerts/toast'
import { getMyPlayer } from '../../../commons/players/players';



const SendMessage = ({gameId}) => {
  const [msg, setMsg] = useState('')
  //contemplar los playrs deads
  const [error, setError] = useState('')
  const [isAlive, setisAlive] = useState(true)

  
  useEffect(() => {
    const checkIfImDead = () => {
      getMyPlayer(gameId).then( response => {
        setisAlive(response.alive)
      })
    }
    
    const timer = setInterval(() => {
      checkIfImDead();
    }, 4000);

    return () => clearInterval(timer)
    }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    if(!error){
      const usertoken = localStorage.getItem('user')
      const infotosend = {
        "content" : msg    
      }
      if (isAlive) {
        axios.post(configData.API_URL + '/games/' + gameId + '/messages', infotosend, {
          headers: {
            'Authorization': `Bearer ${JSON.parse(usertoken).access_token}` 
          }
        }).then(response => { 
          if(response.status === 200){
          setMsg('')
          }
        })
        .catch(error => {
          console.log(error)
        })
      }
      else{
        notify_you_dead()
      }
    }
  } 

  const handleOnchange = (e) => {
    if(e.target.name === "message"){
      setMsg(e.target.value)
    }
  }

  return( 
    <div>
      <form onSubmit={onSubmit}>
        <input  
          type='text'
          name='message'
          placeholder='Write something'
          value={msg}
          onChange= {handleOnchange}
          required
        />
        <button type='submit' >Send</button>
      </form>
    </div>
  )

}
export default SendMessage;