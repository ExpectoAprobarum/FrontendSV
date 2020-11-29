import React,{useState} from 'react';
import axios from 'axios';
import configData from '../../../config.json';

const SendMessage = ({gameId}) => {
  const [msg, setMsg] = useState('')
  //contemplar los playrs deads
  const [error, setError] = useState('')


  const onSubmit = (e) => {
    e.preventDefault();
    if(!error){
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
          id='messageC'
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