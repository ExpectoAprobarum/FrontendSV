import React from 'react';
import ReactDom from 'react-dom';
import './popupChaos.css';

export default function PopupChaos({open, proclam}) {
  if (open) {
    return ReactDom.createPortal(
      <div className="modal-chaos">
        <div className="modal-chaos-container">
          <h1 className="modal-chaos-header">
            The government has fallen into CHAOS !!
          </h1>
          <h2 className="modal-chaos-detail">
            This proclamation will be played immediately: 
          </h2>
          <h2 className={"modal-chaos-proclamation " + proclam}>
            { proclam === "phoenix" ? (
              proclam.toUpperCase() + " "
            ) : (
              proclam.toUpperCase() + " EATER "
            )}
            PROCLAMATION
          </h2>
        </div>
      </div>,
      document.getElementById('modal-root'),
    )
  } else {
      return null;
  }
}
