import React from 'react'
import ReactDom from 'react-dom'

import './ShowRole.css'

export default function SendExpelliarmus({open, approve, notAprove}) {
  if (open) {
    return ReactDom.createPortal(
      <div className='modalRole'>
        <div className="modal-mainRole expelliarmus">
          <h1 className='hExpell'>
            Expelliarmus!!
          </h1>
          <button
            className='buttExpell'
            onClick={approve}>
            Use
          </button>
          <button
            className='buttExpell'
            onClick={notAprove}>
            Not Use
          </button>
        </div>
      </div>,
      document.getElementById('modal-root'),
    )
  } else {
      return null;
  }
}
