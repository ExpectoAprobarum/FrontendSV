import React, {useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {notify_user_created_err, notify_user_created_succ}
    from '../../commons/alerts/toast';
import configData from '../../config.json';
import "./register.css";
import '../lobby/LobbyStyles.css';

const Register = () =>{
  const[usuario, setUsuario] = useState('');
  const[email, setEmail] = useState('');
  const[contraseña, setContraseña] = useState('');
  const[registerError, setRegisterError] = useState(false);
  const[userAlias, setUserAlias] = useState('');

  const handleOnSubmit = (e) => {
    e.preventDefault();  
      if(!  registerError ){
        const infotosend ={
          username: usuario,
          useralias: userAlias,
          email: email,
          password: contraseña,
          frontURL: 'http://localhost:3000/verification?',
        } 
        console.log(infotosend)       
        axios.post(configData.API_URL + '/users/', infotosend )
          .then(response => { 
            if(response.status === 200){
              notify_user_created_succ()
            }
          })
          .catch(error => {
            notify_user_created_err()
            console.log(error)
          })
      }
  }
    
  const handleOnchange = (e) => {
    if( e.target.name === 'email') {
      setEmail(e.target.value)
    }
    else if(e.target.name === 'contraseña'){
      setContraseña(e.target.value)
    }
    else if(e.target.name === 'usuario'){
      setUsuario(e.target.value)
    }
    else if(e.target.name === 'userAlias'){
      setUserAlias(e.target.value)
    }
        
    if(  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(email) ){
      setRegisterError(false)
    }else{
      setRegisterError(true)
    }    
  }
     
  return (
    <div>
      <div className="divCreateJoin lobby">
        <Link className="liStyle back" to="/">{`<`}</Link>
      </div>
      <div className='fom-popup-BoxShadow register'>
        <h1 style={{fontSize:"45px"}} className="h1TittleLobby">
          Sign in
        </h1>
        <form onSubmit={handleOnSubmit} className='formRegister'>
          <div className="divTitleInput">User</div>
          <input
            id='usuarioR'
            type='text' 
            name='usuario' 
            placeholder='Input a username' 
            value={usuario} 
            onChange={handleOnchange}
            required 
          />
          <div className="divTitleInput">UserAlias</div>
          <input
            id='userAl'
            type='text' 
            name='userAlias' 
            placeholder='Input UserAlias' 
            value={userAlias} 
            onChange={handleOnchange}
            required
          />
          <div></div>
          <div className="divTitleInput">Email</div>
          <input
            id='emailR'
            type='text' 
            name='email' 
            placeholder='Input Email' 
            value={email} 
            onChange={handleOnchange}
            required
          />
          <div>    
            { registerError ? 
              <label style={{paddingLeft:"20px"}}>
                Email ingresado no valido
              </label> 
              : <p></p> }
          </div>
          <div className="divTitleInput">Password</div>
          <input  className="input2"
            id='contraseñaR'
            type='password' 
            name='contraseña' 
            placeholder='Input Password' 
            value={contraseña} 
            onChange={handleOnchange} 
            minLength="7"
            required
          />
          <div className="boxBtt">
            <button type='submit' 
              className="buttonFound registerLogin">
              Create User
            </button>
          </div>                
        </form>
      </div>
    </div>
  )  
}



export default Register;