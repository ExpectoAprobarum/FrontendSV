import React, { useEffect, useState } from 'react';
import axios from 'axios';
import configData from '../../../config.json';
import { getMyPlayer } from '../../../commons/players/players';
import AvadaKedavra from './spells/AvadaKedavra';

const CastSpell = ({gameId, ministerId}) => {
  const [currentSpell, setCurrentSpell] = useState("");
  const [myPlayer, setMyPlayer] = useState({});

  /*const getBoard = (game_id) => {
    return axios.get(configData.API_URL + '/games/' + game_id + '/board')
      .then(res => res.data)
  }*/

  useEffect(() => {
    getMyPlayer(gameId)
      .then(res => {
        setMyPlayer(res)
      });
    /*getBoard(gameId)
      .then(res => {
        setCurrentSpell("avada kedavra" something using board data)
      })
    */
    setCurrentSpell("avada kedavra")
  }, [])

  return (
    <div className="CastSpell">
      { myPlayer.id === ministerId ? (
        <div className="is-minister">
          { currentSpell !== '' ? (
            <div className="spell">
              { currentSpell === "avada kedavra" ? (
                <AvadaKedavra
                  gameId={gameId}
                  ministerId={ministerId}
                />
              ) : (
                <p>No matching Spell</p>
                )
              }
            </div>
          ) : (
            <div>
              <h2>No spell available</h2>
            </div>
            )
          }
        </div>
      ) : (
        <h2>Minister is casting Spell: {currentSpell.toUpperCase()}</h2>
        )
      }
    </div>
  )
}

export default CastSpell
