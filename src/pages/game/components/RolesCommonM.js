import React, {useState, useEffect} from 'react';
import axios from 'axios';
import mortifago0 from '../assets/mortifagoLogos/mortifago1.png'
import mortifago1 from '../assets/mortifagoLogos/mortifago2.png'
import mortifago2 from '../assets/mortifagoLogos/mortifago3.png'
import voldemortimg from '../assets/mortifagoLogos/volde.png'
import './RolesCommonM.css';
import { getPlayers,  getMyPlayer } from '../../../commons/players/players';

const imageArray = [mortifago0, mortifago1, mortifago2 ]

const RolesCommonMort = ({gameId}) => {
  const [numberOfPlayerMort, setNumberofPlayer] = useState()
  const [playerMort, setPlayerMortf] = useState([])
  const [showLoyalty, setShowLoyalty] = useState(false)
  const [myid, setMyid] = useState('')
  const [myrole, setMyrole] = useState('')
  const [voldemort, setVoldemort] = useState()

  const showloyalty = () => {
    setShowLoyalty(true)
  }
  const closeloyalty = () => {
    setShowLoyalty(false)
  }

  useEffect ( () => {
    const getMortis = () => {
      getPlayers(gameId).then(
        res=>{
          const listofPlayeruseralias = res.filter(
            player => ( player.id !== myid && player.role === 'death eater' && ! player.is_voldemort ))
            .map(player => player.user.useralias)
          const voldemort = res.filter(player => (player.is_voldemort))[0]
          setVoldemort(voldemort)
          console.log("ESTO TRAIGO", voldemort)
          setPlayerMortf(listofPlayeruseralias)
          setNumberofPlayer(listofPlayeruseralias.length)
        }
      )
    }
    const whoim = () => {
      getMyPlayer(gameId).then(
        res =>{
          setMyrole(res.role)
          setMyid(res.id)
        }
      )
    }
  
    whoim()
    getMortis()
  }, [])

  return (
  <div>
    {(myrole === 'death eater') ?
      <div>
        {showLoyalty  ? 
        <div className='showLoyalty'>
          <div className='title'><h1>Team Mortifagos</h1></div>
          <div className={"containerAliados voldemort"}>
                  <img className='mortifago'
                    src={voldemortimg}
                  />
                  <div className='useralias'>
                      <h1 >
                        {voldemort.user.useralias}
                      </h1>
                  </div>
                </div>
          { playerMort.map(
            (mort, index) =>
                <div className={`containerAliados mortifagus${index}`}>
                  <img className='mortifago'
                    src={imageArray[index]}
                  />
                  <div className='useralias'>
                      <h1 >
                        {mort}
                      </h1>
                  </div>
                </div>
              )
          }
        <button className='closeLoyaltybutton' onClick={closeloyalty}></button>  
      </div>
      : <button className='showLoyaltybutton' onClick={showloyalty}></button>
      }
    </div> 
    : <p></p>}
    
    
  </div>
  )

}

export default RolesCommonMort
