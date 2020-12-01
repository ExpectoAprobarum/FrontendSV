import React, { useState } from 'react';
import Login from '../login/login'
import InviteJoin from './inviteJoin'

const Invite = ({gamePass}) => {
  const [needLogIn, setNeddLogIn] = useState(false)

  var URLsearch = window.location.search;
  let params = new URLSearchParams(URLsearch);
  let game = parseInt(params.get("game"));

  useState(() => {
    const needLog = () => {
      const usertoken = localStorage.getItem('user');
      if(usertoken === null) {
        setNeddLogIn(true)
      }
    }
    needLog()
  })

  return(
    <div>
      { needLogIn ? <Login invite={game}/>
        : <InviteJoin gameJoin={game}/>
      }
    </div>
  );
}
export default Invite;
