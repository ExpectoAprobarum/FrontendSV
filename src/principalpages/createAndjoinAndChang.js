import {React, useEffect }from 'react';
import { Link } from 'react-router-dom';
import PageCreateGame from '../pages/creategame/PageCreateGame';
import "../pages/creategame/buttonStyle.css"
import ListPerson from '../pages/joinagame/Lists';
import axios from 'axios'

import "./createAndjoinAndChang.css"

const PrincipalPage = () => {
  useEffect(() => {
    const testfeedback = () => {
      const usertoken = localStorage.getItem('user')
      axios.get('http://127.0.0.1:8000/users/me',{
        headers: {
          'Authorization': `Bearer ${JSON.parse(usertoken).access_token}` 
        }
      }).then(response => { 
        if(response.status === 200){
          const userAlias = response.data.useralias  
        }
      })
      .catch(error => {
        console.log(error)
      })
    }
    testfeedback()
  }, [])
  
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
        <h1 style={{paddingTop: "20px", fontSize:"80px"}}>Welcome userAlias</h1>
        <h1 style={{fontSize:"50px"}}>To</h1>
        <h1 style={{ fontSize:"80px"}}>Secret Voldemort</h1>
      </div>
      <PageCreateGame />
      <ListPerson />
    </div>
  )
}

export default PrincipalPage;
