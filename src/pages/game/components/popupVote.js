import React from 'react'
import ReactDom from 'react-dom'

import './ShowRole.css'

export default function PopupVote({open, headM}) {
  if (open) {
    return ReactDom.createPortal(
      <div className='modalRole'>
        <div className="modal-mainRole">
          <h1 style={{fontSize: '90px'}} className='h1Custom'>
            New Government!!
          </h1>
          <h2 style={{fontSize: '38px'}} className='h2Custom'>
            Headmaster: {headM[0].user.useralias}
          </h2>
          <h2 style={{fontSize: '38px'}} className='h2Custom'>
            Minister: {headM[1].user.useralias}
          </h2>
        </div>
      </div>,
      document.getElementById('modal-root'),
    )
  } else {
      return null;
  }
}
