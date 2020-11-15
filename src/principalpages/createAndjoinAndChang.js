import {React, useEffect, useState}from 'react';
import { Link } from 'react-router-dom';
import PageCreateGame from '../pages/creategame/PageCreateGame';
import "../pages/creategame/buttonStyle.css"
import ListGames from '../pages/joinagame/Lists';
import axios from 'axios'
import {notify_gameName_invalid} 
  from '../commons/alerts/toast'
import "./createAndjoinAndChang.css"

const PrincipalPage = () => {
  const [userAlias, setUserAlias] = useState('')

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
          setUserAlias(userAlias)
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
        <Link
          className="LinkStyle back home"
          onClick={exitDeleteToken}
          to="/">
          Log Out
        </Link>
        <Link
          className="LinkStyle change home"
          to='/changeProfile'>
          Profile
        </Link>
      <div className='DivCreateJoinChang'>
        <h1 style={{paddingTop: "20px", fontSize:"80px"}}>Welcome {userAlias}</h1>
        <h1 style={{fontSize:"50px"}}>To</h1>
        <h1 style={{ fontSize:"80px"}}>Secret Voldemort</h1>
      </div>
      <PageCreateGame />
      <ListGames />
    </div>
  )
}

export default PrincipalPage;
