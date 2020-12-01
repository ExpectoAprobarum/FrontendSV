import React, {useEffect, useState} from 'react';
import axios from 'axios';
import configData from '../../../config.json';
import PopupChaos from './popupChaos';
import './Board.css';

const Board = ({gameId, showChaos, chaosProclam}) => {
  const [boardInfo, setBoardInfo] = useState({});

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

    const timer = setInterval(() => {
      getBoardInfo();
    }, 2000);

    return () => clearInterval(timer)
  }, [])

  const spellsInfo = boardInfo === undefined || 
                     boardInfo.spell_fields === undefined ? (
    "Loading spells"
  ) : (
    boardInfo.spell_fields.map((spell, index) => {
      return (
        <li className="spell-container" key={index}>
          { spell === "" || index === boardInfo.spell_fields.length - 1 ? (
              null
            ) : (
              <div>
                <h2 className="death-ammount">{index + 1} : </h2>
                <h2 className="header">
                  {spell.toUpperCase()}
                </h2>
              </div>
            )
          }
        </li>
      )
    })
  )

  return (
    <div className="Board">
    <div className="proclamations">
      <div className="container">
        <div className="card">
          <div className="box phoenix-box">
            <div className="content phoenix-content">
              <h3>Phoenix Order</h3>
              <h2>{ boardInfo ? boardInfo.po_proc : "0"}</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="card">
          <div className="box death-box">
            <div className="content death-content">
              <h3>Death Eater</h3>
              <h2>{ boardInfo ? boardInfo.de_proc : "0"}</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="card">
          <div className="box chaos-box">
            <div className="content chaos-content">
              <h3>Chaos Counter</h3>
              <h2>{ boardInfo ? boardInfo.caos : "0"}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="spells-info">
      <ul>
        <h2 className="spell-info-header">
          SPELLS
        </h2>
        { spellsInfo }
        <h3 className="next-spell">
          Next: { 
            boardInfo === undefined || boardInfo.spell_fields === undefined ? 
            " "
            : (boardInfo.spell_fields[boardInfo.de_proc]) ? (
              boardInfo.spell_fields[boardInfo.de_proc].toUpperCase()
            ) : " " }
        </h3>
      </ul>
    </div>
    <div className="chaos-popup">
      <PopupChaos 
        open={showChaos}
        proclam={chaosProclam}
      />
    </div>
  </div>
  )
}

export default Board
