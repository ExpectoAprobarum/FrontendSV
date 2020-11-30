import React, {useState, useEffect} from 'react';
import axios from 'axios';
import mortifago1 from '../assets/mortifagoLogos/mortifago1.png'
import mortifago2 from '../assets/mortifagoLogos/mortifago2.png'
import mortifago3 from '../assets/mortifagoLogos/mortifago3.png'
import mortifago4 from '../assets/mortifagoLogos/mortifago4.png'
import mortifago5 from '../assets/mortifagoLogos/mortifago5.png'
import './RolesCommonM.css';
import { getPlayers } from '../../../commons/players/players';

const imageArray = [mortifago1, mortifago2, mortifago3, mortifago4, mortifago5 ]

const RolesCommonMort = ({gameId}) => {
  const [rolePlayer, setRolePlayer] = useState('')
  const [numberOfPlayerMort, setNumberofPlayer] = useState()
  const [playerMort, setPlayerMortf] = useState([])
  


  const alliesList = playerMort.map((mort) => {
    (
    <div className={'containerAliados mortifago' }>
      <div className='username'>
          <h1>{mort}</h1>
      </div>
    </div>
    )
})
  useEffect ( () => {
    const getMortis = () => {
      getPlayers(gameId).then(
        res=>{
          console.log("AAAA", res.length)
          const listofPlayerUsername = res.filter(player => 
             player.role === 'death eater' 
             ).map(player => player.user.useralias)
          setPlayerMortf(...playerMort, listofPlayerUsername)
          setNumberofPlayer(listofPlayerUsername.length)

        }
      )
    }
    getMortis()
  }, [])

  return (
  <div>
    {alliesList}
  </div>
  )

}

export default RolesCommonMort