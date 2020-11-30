import React, {useState} from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';
import configData from '../../config.json';

const Verification = (props) => {
//el slice es para sacar el ? del principio de la url param
const code = window.location.search.slice(1, );
const [redirect, setRedirect]= useState(false)

axios.post(configData.API_URL + '/users/confirm', {code })
.then(response => { 
  if(response.status === 200){
    setRedirect(true)
  }
})
.catch(error => {
  console.log( error)
})
if(redirect){
  return <Redirect to="/" />
}  
  return(
    <div>
    </div>
  )
}

export default Verification;