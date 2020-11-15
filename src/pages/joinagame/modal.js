import React from 'react'
import ReactDom from 'react-dom'
import { Link } from 'react-router-dom'; // prueba

import './styleSearch.css'

export default function Modal({open, children, handleClose,
                              inPartida, gameID, error}) {
  if (open) {
    return ReactDom.createPortal(
      <div className='modal'>
        <div className="modal-main">
          {children}
          <div>
            <p className= "pCustom" style={{fontSize:"18px", color: "red"}}>
              {error[0] ? error[1] : "_"}
            </p>
            <div style={{paddingTop: "18px"}}>
              { error[0] ?
                ""
                : (<button className="buttonFound bttmodal" onClick={inPartida}>
                      <Link className="linked" to={{
                          pathname: '/game',
                          state: {
                              gameId: gameID
                          }
                      }}>Join</Link>
                    </button>)
              }
              <button onClick={handleClose} className="buttonFound bttmodal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>,
      document.getElementById('modal-root'),
    )
  } else {
      return null;
  }
}
