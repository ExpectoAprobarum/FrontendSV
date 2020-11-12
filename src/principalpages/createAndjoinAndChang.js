import {React }from 'react';
import { Link } from 'react-router-dom';
import PageCreateGame from '../pages/creategame/PageCreateGame';
import "../pages/creategame/buttonStyle.css"
import ListPerson from '../pages/joinagame/Lists';

import "./createAndjoinAndChang.css"

const PrincipalPage = () => {
  
  const exitDeleteToken = () => {
    localStorage.removeItem("user")
  }

  return(
    <div className="DivCreateAndJoin">
      <div className="DivCreateJoin lobby">
        <Link 
          className="LinkStyle back home" 
          onClick={exitDeleteToken}
          to="/">
          Log Out
        </Link>
      </div>
      <div className='DivCreateJoin lobby'>
        <Link 
          className="LinkStyle change home"
          to='/changeProfile'>
          Profile
        </Link>
      </div>
      
      <div className='DivCreateJoinChang'>
        <h1 style={{paddingTop: "20px", fontSize:"80px"}}>Welcome</h1>
        <h1 style={{fontSize:"50px"}}>To</h1>
        <h1 style={{ fontSize:"80px"}}>Secret Voldemort</h1>
      </div>
      <PageCreateGame />
      <ListPerson />
    </div>
  )
}

export default PrincipalPage;
