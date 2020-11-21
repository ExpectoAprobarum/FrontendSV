import React, { useEffect, useState } from 'react';
import axios from 'axios';
import configData from '../../../../config.json';
import { getPlayers } from '../../../../commons/players/players';
import PlayerList from '../PlayerList';
import { notify_player_choose_err } from '../../../../commons/alerts/toast';
import { Modal } from 'react-bootstrap';
import './Modal.css';
import './SpellObjective.css';

const Crucio = ({gameId, ministerId}) => {
  const [selected, setSelection] = useState(22);
  const [players, setPlayers] = useState([]);
  const [loyalty, setLoyalty] = useState("");
  const [showLoyalty, setShowLoyalty] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getPlayers(gameId)
      .then(res => {
        setPlayers(res)
      });
  }, [gameId]);

  const selectPlayer = (id) => {
    setSelection(id);
  }

  const sendElection = () => {
    const usertoken = localStorage.getItem('user');
    axios.post(configData.API_URL + '/games/' + gameId + '/crucio',
      { "id": selected }, {
      headers: {
          'Authorization': `Bearer ${JSON.parse(usertoken).access_token}`
        }
      })
      .then(res => {
        if(res.status === 200) {
          setLoyalty(res.data);
        }
      })
      .catch(error => {
        notify_player_choose_err();
      })
  }

  const modalShow = () => {
    if(selected !== 0) {
      /*get loyalty*/
      setLoyalty("phoenix");
      setShowModal(true);
    }
    else {
      notify_player_choose_err();
    }
  }

  const modalHide = () => setShowModal(false);

  const revealCard = () => {
    setShowLoyalty(true);
    document.getElementById("reveal").disabled = true;
    setTimeout(() => {
      setShowLoyalty(false);
      setShowModal(false);
      /*send post*/
    }, 6000)
  }

  return (
    <div className="Spell">
      {
        loyalty === "" ? (
          <div>
            <h2 className="spell-header">Select player to cast: Crucio</h2>
            <div className="player-list">
              <PlayerList
                selectPlayer={selectPlayer}
                selected={selected}
                players={players}
                showCond={["alive", true]}
                chooseCond={["alive", true]}
                minister={[ministerId, false]}
              />
            </div>
            <button
              className="sendSpellElection"
              id="sendSpellElection"
              onClick={modalShow}>
              Choose
            </button>
          </div>
        ) : (
          <div>
            <Modal
              show={showModal}
              onHide={modalHide}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header>
                <Modal.Title>Crucio</Modal.Title>
                <hr />
              </Modal.Header>
              <Modal.Body>
                <div className="crucio-body">
                  {
                    selected ? (
                      <div>
                        <h3 className="investigate">
                          Investigate: {
                            players.filter(player => {
                              return player.id === selected
                            }).map(player => {
                              return (
                                <h3 className="investigate-alias">
                                  {player.user.useralias}
                                </h3>
                              )
                            })
                          }
                        </h3>
                        <hr />
                        <div className="loyalty">
                          {
                            showLoyalty ? (
                              <h3>{loyalty}</h3>
                            ) : (
                              <div className="loyalty-container">
                                <h3>Waiting for you to reveal</h3>
                              </div>
                            )
                          }
                        </div>
                      </div>
                    ) : (
                      <h3>No player selected</h3>
                    )
                  }
                </div>
                <button
                  className="reveal"
                  id="reveal"
                  onClick={revealCard}>
                  Reveal Loyalty !
                </button>
              </Modal.Body>
            </Modal>
          </div>
        )
      }
    </div>
  )
}

export default Crucio
