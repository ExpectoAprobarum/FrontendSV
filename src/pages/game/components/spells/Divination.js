import React, { useEffect, useState } from 'react';
import axios from 'axios';
import configData from '../../../../config.json';
import { Modal } from 'react-bootstrap';
import './Divination.css';

const Divination = ({gameId}) => {
  const [divination, setDivination] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDivination, setShowDivination] = useState(false);

  useEffect(() => {
    const getCards = () => {
      const usertoken = localStorage.getItem('user');
      axios.get(configData.API_URL + '/games/' + gameId + '/divination', {
        headers: {
            'Authorization': `Bearer ${JSON.parse(usertoken).access_token}` 
          }
        })
        .then(res => {
          if(res.status === 200) {
            setDivination(res.data.data);
            setShowModal(true);
          }
        })
        .catch(error => {
          console.log(error)
        })
    }

    getCards();
  }, [gameId])

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
  
  const modalHide = () => setShowModal(false);

  const showCards = () => {
    setShowDivination(true);
    setTimeout(() => {
      setShowModal(false);
      endTurn();
    }, 6000);
  }

  return (
    <div className="Divination">
        {
          divination.length > 0 ? (
            <Modal
              className="modal-divination"
              show={showModal}
              onHide={modalHide}
              backdrop="static"
              keyboard={false}
            >
              {
                showDivination ? (
                  <div className="divination">
                    <h2 className="header">
                      Divination cards:
                    </h2>
                    <div className="divination-cards">
                      <button
                        className={divination[0] + " left"}
                        id="proc1"
                        disabled
                      />
                      <button 
                        className={divination[1] + " center"}
                        id="proc2"
                        disabled
                      />
                      <button
                        className={divination[2] + " right"} 
                        id="proc3" 
                        disabled
                      />
                    </div>
                  </div>
                ) : (
                  <button className="showDivination" onClick={showCards}>
                    DIVINATION
                  </button>
                )
              }
              
            </Modal>
          ) : (
            <h2>
              Getting Divination cards ...
            </h2>
          )
        }
    </div>  
  )
}

export default Divination
