import React, {useState, useEffect} from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import './ShowRole.css'
import morti from '../assets/Wiborita.png';
import phoenix from '../assets/Fenix.png';

const ShowRole = ({gameId}) => {
  const [listPlayers, setListPlayers] = useState([])
  const [rolePlayer, setRolePlayer] = useState([])

  var idPlayer = 0
  const usertoken = localStorage.getItem('user');
  if(usertoken) {
    idPlayer = jwt_decode(usertoken).sub.id;
  }
  useEffect(() => {
    const getPlayers = () => {
      const usertoken = localStorage.getItem('user')
      axios.get(`http://127.0.0.1:8000/games/${gameId}/players`, {
          headers: {
              'Authorization': `Bearer ${JSON.parse(usertoken).access_token}`
          }
      }).then(response => {
        if(response.status === 200){
          setListPlayers(response.data.data)
          setRolePlayer(response.data.data.find(
            player => player.user.id === idPlayer
          ))
          console.log(rolePlayer)
        }
      })
      .catch(error => {
        console.log(error)
      })
    }

    getPlayers()
  }, [])

  return(
    <div className="BoxShadow">
      <div className="hDivRole">
        <li className="hDivRole">{`${rolePlayer.role}`.toUpperCase()}</li>
        <li className="hDivRole">{rolePlayer.is_voldemort ?
          `Voldemort` : ""}</li>
      </div>
      <div>
        { (`${rolePlayer.role}`.toUpperCase() === "PHOENIX ORDER") ?
          <img  className="imgDivRole" src={phoenix} alt="phoenix" />
          : <img  className="imgDivRole" src={morti} alt="morti" />
        }
      </div>
    </div>
  )
}
export default ShowRole;
