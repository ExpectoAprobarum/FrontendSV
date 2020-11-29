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
          console.log("ESTO TRAE EL BACK", res)
          
          const response = res.data.data.map( messageAndPlayer => [messageAndPlayer.send_by.useralias, messageAndPlayer.content])
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
          <div >
            <MessageBox 
              title={entry[0]}
              titleColor='red'
              type='text'
              text={entry[1]}
              avatar = "https://static.vecteezy.com/system/resources/previews/000/566/937/non_2x/vector-person-icon.jpg"
            />
          </div>)
  )

}

export default WindowChat;