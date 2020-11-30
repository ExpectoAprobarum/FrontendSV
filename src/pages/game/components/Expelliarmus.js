import React, {useState, useEffect} from 'react';
import axios from 'axios';
import configData from '../../../config.json';
import SendExpelliarmus from './sendExpelliarmus';
import { getMyPlayer } from '../../../commons/players/players';
import './Expelliarmus.css'

const Expelliarmus = ({gameId, gameInfo, ministerId, headmasterId}) => {
  const [openExp, setOpenExp] = useState(false);
  const [approved, setApproved] = useState(false);
  const [voted, setVoted] = useState(false);
  const [boardInfo, setBoardInfo] = useState({});
  const [myPlayer, setMyPlayer] = useState({});
  const [useExpelliarmus, setUseExpelliarmus] = useState([false, undefined])

  useEffect(() => {
    const getBoardInfo = () => {
      const usertoken = localStorage.getItem('user');
      axios.get(configData.API_URL + '/games/' + gameId + '/board', {
        headers: {
            'Authorization': `Bearer ${JSON.parse(usertoken).access_token}`
          }
      })
      .then(res => {
        if(res.status === 200) {
          setBoardInfo(res.data);
        }
      })
      .catch(error => {
        console.log(error)
      })
    }

    getMyPlayer(gameId)
      .then(res => {
        setMyPlayer(res)
      });

    getBoardInfo()
  }, [gameInfo.round])

  const sendExpelliarmus = (e) => {
    if (boardInfo.de_proc >= 5 && gameInfo.phase === 'headmaster play') {
      const idPart = parseInt(gameId)
      const usertoken = localStorage.getItem('user')
      console.log('approved', approved);
      axios.post(`${configData.API_URL}/games/${idPart}/expelliarmus`,
        {vote: e}, {
          headers: {
            'Authorization': `Bearer ${JSON.parse(usertoken).access_token}`
        }
      }).catch(error => {
        console.log(error)
      })
    }
  }

  useEffect(() => {
    const expelliarmus = () => {
      if (gameInfo.minister_expelliarmus === undefined ||
        gameInfo.headmaster_expelliarmus === undefined ) {
        setUseExpelliarmus([false, undefined])
      } else {
        setUseExpelliarmus(
          [gameInfo.minister_expelliarmus
            && gameInfo.headmaster_expelliarmus, true]
        )
      }
    }
    expelliarmus()
  }, [gameInfo.minister_expelliarmus, gameInfo.headmaster_expelliarmus])



  const sendSpell = () => {
    setOpenExp(!openExp)
  }

  const showVote = () => {
    setVoted(!voted)
  }

  const approve = () => {
    setApproved(true)
    setOpenExp(!openExp)
    sendExpelliarmus(true)
    showVote()
  }

  const notAproveExp = () => {
    setApproved(false)
    setOpenExp(!openExp)
    sendExpelliarmus(false)
    showVote()
  }

  return (
    <div className=''>
      { openExp
        ? <SendExpelliarmus
            open={openExp}
            approve={approve}
            notAprove={notAproveExp}>
          </SendExpelliarmus>
        : " "
      }

      { !voted && useExpelliarmus[1] === undefined
        ? ( boardInfo.de_proc >= 5
          && (myPlayer.id === ministerId || myPlayer.id === headmasterId)
          ? <button
              className='buttonBoard'
              onClick={sendSpell}>
              Expelliarmus
            </button>
          : ''
        )
        : ''
      }
      { useExpelliarmus[1] === true
        ? <button className='buttonBoard'>
            { useExpelliarmus[0]
              ? 'Expelliarmus used'
              : 'Expelliarmus NOT used'
            }
          </button>
        : ''
      }

    </div>
  )
}
export default Expelliarmus;
