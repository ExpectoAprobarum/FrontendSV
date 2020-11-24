import React,{useState, useEffect} from 'react';
import axios from 'axios';
import configData from '../../../config.json';
import { MessageBox, Avatar } from 'react-chat-elements'
import 'react-chat-elements/dist/main.css';


const WindowChat = ({gameId}) => {
  const [messages, setMessages] = useState([]);
  
  useEffect(()=>{
    const getMessages = () => {
      const usertoken = localStorage.getItem('user');
      axios.get(configData.API_URL + '/games/' + gameId + "/messages", {
        headers: {
            'Authorization': `Bearer ${JSON.parse(usertoken).access_token}`
          }
      })
      .then(res => {
        if(res.status === 200) {
          //estaria bueno que me diera en la respuesta el nombre, me trae el player pero sin nombre ni nada.
          const response = res.data.data.map( messageAndPlayer => messageAndPlayer.content)
          setMessages(...messages, response)
          
        }
      })
      .catch(error => {
        console.log( error)
      })
    }
    const timer = setInterval(() => {
      getMessages();
    }, 2000);

    return () => clearInterval(timer)
  }, [])

  

  return(
      messages.map(
        entry =>
          <div key={entry.id}>
            <MessageBox 
              type='text'
              text={entry}
              avatar = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW4H2aNRj447pJrUzxZ1fjETKrr9_cGu7egqAaA5LHs6a0JeT79ysKjDwow0ldlmD8Dgqia6PZeERLAWC0jKwACERtiObB5Wo&usqp=CAU&ec=45730948"
            />
          </div>)
  )

}

export default WindowChat;

