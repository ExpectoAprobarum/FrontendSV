import React from 'react'
import ReactDom from 'react-dom'
import { Link } from 'react-router-dom'; // prueba

import '../css/styleSearch.css'

export default function Modal({open, children, handleClose, inPartida, gameID}) {
    if (open) {
        return ReactDom.createPortal(
            <div className='modal'>
                <div className="modal-main">
                    {children}
                    <button onClick={inPartida} className="buttonFound bttmodal"><Link className="linked" to={{
                        pathname: '/Game',
                        aboutProps: {
                            gameId: gameID
                        }
                    }}>Unirse</Link></button>
                    <button onClick={handleClose} className="buttonFound bttmodal">Close</button>
                </div>
            </div>,
            document.getElementById('modal-root'),
        )
    } else {
        return null;
    }
}