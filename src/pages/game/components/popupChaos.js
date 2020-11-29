import React from 'react';
import ReactDom from 'react-dom';
import './popupChaos.css';

export default function PopupChaos({open, proclam}) {
  if (open) {
    return ReactDom.createPortal(
      <div className="modal-chaos">
        <div className="modal-chaos-container">
          <h1 style={{fontSize: '50px'}}>
            The government has fallen into CHAOS !!
          </h1>
          <h2 style={{fontSize: '35px'}}>
            This proclamation will be played immediately: { 
                proclam.toUpperCase()
              }
          </h2>
        </div>
      </div>,
      document.getElementById('modal-root'),
    )
  } else {
      return null;
  }
}
