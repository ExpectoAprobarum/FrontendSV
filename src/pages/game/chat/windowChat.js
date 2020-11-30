import React,{useState, useEffect} from 'react';
import axios from 'axios';
import configData from '../../../config.json';
import { MessageBox, Avatar } from 'react-chat-elements'
import { getMyPlayer, getPlayers } from '../../../commons/players/players';
import 'react-chat-elements/dist/main.css';

const WindowChat = ({gameId}) => {
  const [messages, setMessages] = useState([]);
  const [myPlayer, setMyPlayer] = useState({});
  const [players, setPlayers] = useState([]);
  const [myAlias, setMyAlias] = useState('')

  useEffect(()=>{
    const playersChat = () => {
      getPlayers(gameId)
        .then(res => {
          setPlayers(res)
        });

      getMyPlayer(gameId)
        .then(res => {
          setMyPlayer(res.user)
          selectAlias()
        });
    }

    playersChat()
  }, [])

  const selectAlias = () => {
    if (players.length !== 0 && myPlayer !== undefined) {
      let alias = players.find(
        players => players.user.id === myPlayer
      ).user.useralias
      setMyAlias(alias)
    }
  }

  useEffect(() => {
    selectAlias()
    const getMessages = () => {
      const usertoken = localStorage.getItem('user');
      axios.get(configData.API_URL + '/games/' + gameId + "/messages", {
        headers: {
            'Authorization': `Bearer ${JSON.parse(usertoken).access_token}`
          }
      })
      .then(res => {
        if(res.status === 200) {
          const response = res.data.data.map(
            messageAndPlayer => [
              messageAndPlayer.send_by.useralias,
              messageAndPlayer.content
            ])
          setMessages(response.reverse())
        }
      })
      .catch(error => {
        console.log( error)
      })
    }
    const timer = setInterval(() => {
      getMessages();
    }, 2500);

    return () => clearInterval(timer)
  }, [messages.length])

  return(
      messages.map(
        entry =>
          <div >
            <MessageBox
              title={entry[0]}
              titleColor='red'
              type='text'
              position= {entry[0] === myAlias ? 'right' : 'left'}
              text={entry[1]}
              avatar = "https://static.vecteezy.com/system/resources/previews/000/566/937/non_2x/vector-person-icon.jpg"
            />
          </div>)
  )

}

export default WindowChat;
