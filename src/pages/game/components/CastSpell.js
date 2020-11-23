import React, { useEffect, useState } from 'react';
import axios from 'axios';
import configData from '../../../config.json';
import { getMyPlayer } from '../../../commons/players/players';
import AvadaKedavra from './spells/AvadaKedavra';
import Divination from './spells/Divination';
import Imperius from './spells/Imperius';
import './CastSpell.css';

const CastSpell = ({gameId, ministerId, passDivination, setDivinationInfo}) => {
  const [currentSpell, setCurrentSpell] = useState("");
  const [myPlayer, setMyPlayer] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const getBoardSpell = () => {
      const usertoken = localStorage.getItem('user');
      axios.get(configData.API_URL + '/games/' + gameId + '/board', {
        headers: {
            'Authorization': `Bearer ${JSON.parse(usertoken).access_token}`
          }
      })
      .then(res => {
        if(res.status === 200) {
          let spellArray = res.data.spell_fields;
          let boardSize = spellArray.length;
          let deathProc = res.data.de_proc;
          if(deathProc < boardSize) {
            setCurrentSpell(spellArray[deathProc-1]);
          }
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
    getBoardSpell();
  }, [gameId])

  const passCards = (newCards) => {
    setCards(newCards)
  }

  const showDivination = (show) => {
    setDivinationInfo(show)
  }

  useEffect(() => {
    passDivination(cards);
  }, [cards])

  return (
    <div className="CastSpell">
      { myPlayer.id === ministerId ? (
        <div className="is-minister">
          { currentSpell !== '' ? (
            <div className="spell">
              { currentSpell === "avadakedavra" ? (
                <AvadaKedavra
                  gameId={gameId}
                  ministerId={ministerId}
                />
              ) : (
                currentSpell === "divination" ? (
                  <Divination
                    gameId={gameId}
                    passDivination={passCards}
                    setDivinationInfo={showDivination}
                  />
                ) : (
                  currentSpell === "imperio" ? (
                    <Imperius
                      gameId={gameId}
                      ministerId={ministerId}
                    />
                  ) : (
                    <p>No matching Spell</p>
                  )
                )
              )
              }
            </div>
          ) : (
            <div>
              <h2 className="header">No spell available</h2>
            </div>
            )
          }
        </div>
      ) : (
        <div className="not-minister">
          <h2 className="header">
            Minister is casting Spell: {currentSpell.toUpperCase()}
          </h2>
        </div>
        )
      }
    </div>
  )
}

export default CastSpell
