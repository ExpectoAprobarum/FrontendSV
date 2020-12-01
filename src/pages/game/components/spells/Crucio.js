import React, { useEffect, useState } from 'react';
import axios from 'axios';
import configData from '../../../../config.json';
import { getPlayers } from '../../../../commons/players/players';
import { notify_player_choose_err } from '../../../../commons/alerts/toast';
import { Modal } from 'react-bootstrap';
import SelectPlayer from '../SelectPlayer';
import './Crucio.css';
import './SpellObjective.css';

const Crucio = ({gameId, ministerId}) => {
  const [selected, setSelected] = useState(0);
  const [players, setPlayers] = useState([]);
  const [loyalty, setLoyalty] = useState("");
  const [showLoyalty, setShowLoyalty] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getPlayers(gameId)
      .then(res => {
        setPlayers(res)
      });
  }, []);

  const getLoyalty = (playerId) => {
    const usertoken = localStorage.getItem('user');
    axios.get(configData.API_URL + '/games/' + gameId + '/crucio/' + playerId,
      {
      headers: {
          'Authorization': `Bearer ${JSON.parse(usertoken).access_token}`
        }
      })
      .then(res => {
        if(res.status === 200) {
          setLoyalty(res.data.role);
          setSelected(playerId);
        }
      })
      .catch(error => {
        notify_player_choose_err();
      })

      setShowModal(true);
  }

  const modalHide = () => setShowModal(false);

  const endTurn = () => {
    const usertoken = localStorage.getItem('user');
    axios.post(configData.API_URL + '/games/' + gameId + '/endturn', {}, {
      headers: {
          'Authorization': `Bearer ${JSON.parse(usertoken).access_token}` 
        }
      })
      .then(res => {
        if(res.status === 200) {
          console.log(res.status);
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  const revealCard = () => {
    setShowLoyalty(true);
    document.getElementById("reveal").disabled = true;
    setTimeout(() => {
      setShowLoyalty(false);
      setShowModal(false);
      endTurn();
    }, 6000)
  }

  return (
    <div className="Spell">
      {
        loyalty === "" ? (
          <div>
            <SelectPlayer 
              gameId={gameId}
              ministerId={ministerId}
              phase={'crucio'}
              funChoose={getLoyalty}
            />
          </div>
        ) : (
          <div>
            <Modal
              className="modal-crucio"
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
                  <div>
                    <h3 className="investigate">
                      VICTIM : {
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
                    <div className={"loyalty " + loyalty.split(" ")[0]}>
                      {
                        showLoyalty ? (
                          <h3> { loyalty.toUpperCase() } </h3>
                        ) : (
                          <button
                            className="reveal"
                            id="reveal"
                            onClick={revealCard}>
                            Reveal Loyalty !
                          </button>
                        )
                      }
                    </div>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          </div>
        )
      }
    </div>
  )
}

export default Crucio
