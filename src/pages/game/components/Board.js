import React, {useEffect, useState} from 'react';
import axios from 'axios';
import configData from '../../../config.json';
import './Board.css';

const Board = ({gameId}) => {
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
  }, [gameId])

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
      </div>
      <div className="boards">

      </div>
    </div>
  )
}

export default Board
