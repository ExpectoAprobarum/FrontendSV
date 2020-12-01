import React,{useState} from 'react';
import axios from 'axios';
import configData from '../../../config.json';
import {notify_you_dead } from '../../../commons/alerts/toast'
import { getMyPlayer } from '../../../commons/players/players';



const SendMessage = ({gameId}) => {
  const [msg, setMsg] = useState('')
  
  const onSubmit = (e) => {
    e.preventDefault();
    getMyPlayer(gameId).then( response => {
      const isAlaives = response.alive
      if(isAlaives){
        const usertoken = localStorage.getItem('user')
        const infotosend = {
          "content" : msg    
        }
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
      } else {
        notify_you_dead();
      }
    })
  } 

  const handleOnchange = (e) => {
    if(e.target.name === "message"){
      setMsg(e.target.value)
    }
  }

  return( 
    <div>
      <form onSubmit={onSubmit}>
        <textarea  
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