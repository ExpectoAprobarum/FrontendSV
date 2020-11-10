import React from 'react';
import { Link } from 'react-router-dom';
import PageCreateGame from '../pages/creategame/PageCreateGame';
import ListPerson from '../pages/joinagame/Lists';

const PrincipalPage = () => {
  const exitDeleteToken = () => {
    const usertoken = localStorage.getItem('user');
    console.log("1: ", usertoken);
    if(usertoken) {
      localStorage.removeItem("user")
      console.log("2: ", usertoken);
    }
  }

  return(
    <div className="divCreateJoin">
      <div className="divCreateJoin lobby">
        <Link className="liStyle home back"
          onClick={exitDeleteToken}
          to="/">{`Log Out`}</Link>
      </div>

      <h1 style={{paddingBottom: "50px", fontSize:"80px"}}>Secret Voldemort</h1>
      <PageCreateGame />
      <ListPerson />
    </div>
  )
}

export default PrincipalPage;
