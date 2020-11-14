import React from 'react'
import ReactDom from 'react-dom'

import './ShowRole.css'

export default function PopupVote({open, headM}) {
  if (open) {
    return ReactDom.createPortal(
      <div className='modalRole'>
        <div className="modal-mainRole">
          <h3 style={{fontSize: '27px'}}>New HEADMASTER</h3>
          <h1 style={{fontSize: '50px'}}>{headM.user.useralias}</h1>
        </div>
      </div>,
      document.getElementById('modal-root'),
    )
  } else {
      return null;
  }
}
