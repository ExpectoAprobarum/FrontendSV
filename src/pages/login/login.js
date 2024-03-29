import React, {useState} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import {notify_email_or_password_err, notify_verify_your_email} from '../../commons/alerts/toast';
import InviteJoin from '../invite/inviteJoin'
import "../register/register.css";
import '../lobby/LobbyStyles.css'
import configData from '../../config.json';

const Login = ({invite}) =>{

    const[email, setEmail] = useState('');
    const[contraseña, setContraseña] = useState('');
    const[redirect, setRedirect] = useState(false);
    const[loginError, setLoginError] = useState(false);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if(! loginError ){
          const infotosend ={
            username: email,
            password: contraseña
          }
          axios.post(configData.API_URL + '/auth/token', infotosend)
            .then(response => {
              if(response.status === 200){
                localStorage.setItem('user', JSON.stringify(response.data))
                setRedirect(true)
              }
            })
            .catch(error => {
              if(error.response.status === 400){
                notify_verify_your_email()
              }else{
                notify_email_or_password_err()
              }
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

        if(  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(email) ){
            setLoginError(false)
        }else{
            setLoginError(true)
        }
    }

        if(redirect){
          if (invite !== undefined) {
            return <InviteJoin to={`invite?game=${invite}`}
                        gameJoin={invite}/>
          } else {
            return <Redirect to="/home" />
          }
        }
        return (
        <div>
            <div className="divCreateJoin lobby">
                <Link className="liStyle back" to="/">{`<`}</Link>
            </div>
            <div className='fom-popup-BoxShadow register'>
                <h1 style={{fontSize:"45px"}} className="h1TittleLobby">
                  Welcome
                </h1>

                <form onSubmit={handleOnSubmit} className='formRegister'>
                    <div className="divTitleInput">Email</div>
                    <input
                        id='emailL'
                        type='text'
                        name='email'
                        placeholder='Input Email'
                        value={email}
                        onChange={handleOnchange}
                        required
                    />
                    <div>
                        { loginError ?
                            <label style={{paddingLeft:"20px"}}>
                              Email ingresado no valido
                            </label> :
                            <p></p> }
                        </div>
                    <br />
                    <div className="divTitleInput">Password</div>
                    <input
                        id='contraseñaL'
                        type='password'
                        name='contraseña'
                        placeholder='Input Password'
                        value={contraseña}
                        onChange={handleOnchange}
                        minLength="7"
                        required
                    />
                    <div className="boxBtt login">
                        <button type='submit'
                            className="buttonFound registerLogin">
                                Log in
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )

}



export default Login;
