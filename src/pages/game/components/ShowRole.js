import React, {useState, useEffect} from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import configData from '../../../config.json';
import './ShowRole.css'
import morti from '../assets/Wiborita.png';
import phoenix from '../assets/Fenix.png';
import volde from '../assets/moldem2.png';

const ShowRole = ({gameId, gameInfo}) => {
  const [rolePlayer, setRolePlayer] = useState([])
  const [meAlias, setMeAlias] = useState("")

  var idPlayer = 0
  const usertoken = localStorage.getItem('user');
  if(usertoken) {
    idPlayer = jwt_decode(usertoken).sub.id;
  }

  useEffect(() => {
    const getPlayers = () => {
      const usertoken = localStorage.getItem('user')
      axios.get(`${configData.API_URL}/games/${gameId}/players`, {
          headers: {
              'Authorization': `Bearer ${JSON.parse(usertoken).access_token}`
          }
      }).then(response => {
        if(response.status === 200){
          setRolePlayer(response.data.data.find(
            player => player.user.id === idPlayer
          ))
          setMeAlias(response.data.data.find(
            player => player.user.id === idPlayer
          ).user.useralias)
        }
      })
      .catch(error => {
        console.log(error)
      })
    }

    getPlayers()
  }, [gameInfo.phase])

  return(
    <div className={rolePlayer.alive
        ? `BoxShadow myRole cust ${rolePlayer.role === 'phoenix order'
          ? ' phoenix' : ' death'}`
        : ''
      }>
      { rolePlayer.is_voldemort
        ? <div style={{position: 'relative'}}>
            <img className="imgDivRole volde" src={volde} alt="volde" />
          </div>
        : null
      }

      <div className= "hDivRole my">
        <li
          className="hDivRole"
          style={{fontWeight: 'bold', fontSize: '20px', paddingTop: '8%'}}>
          {`${meAlias}`}
        </li>
        <li
          className="hDivRole rol"
          style={{paddingTop: '10%'}}>
          {`${rolePlayer.role}`.toUpperCase()}
        </li>
        <li
          style={{fontWeight: 'bold'}}
          className="hDivRole" >
          { rolePlayer.is_voldemort
            ? `Voldemort`
            : ""
          }
        </li>
      </div>
      <div style={{position: 'relative'}}>
        { (`${rolePlayer.role}`.toUpperCase() === "PHOENIX ORDER")
          ? <img className="imgDivRole rol" src={phoenix} alt="phoenix" />
          : <img className="imgDivRole rol" src={morti} alt="morti" />
        }
      </div>
      { !rolePlayer.alive
        ? <div className="BoxShadowDead dead">
            <li
              className="hDivRoleDead"
              style={{fontWeight: 'bold', fontSize: '30px'}}>
              DEAD
            </li>
          </div>
        : null
      }
    </div>
  )
}
export default ShowRole;
