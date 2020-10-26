import React from 'react'
import ReactDom from 'react-dom'

import '../css/styleSearch.css'

export default function Modal({open, children, handleClose, inPartida}) {

    if (open) {
        return ReactDom.createPortal(
            <div className='modal'>
                <div className="modal-main">
                    {children}

                    <button onClick={inPartida} className="buttonFound bttmodal">Unirse</button>
                    <button onClick={handleClose} className="buttonFound bttmodal">Close</button>
                </div>
            </div>,
            document.getElementById('modal-root'),
        )
    } else {
        return null;
    }
}