import React, {useState} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import "../register/register.css";
import '../lobby/LobbyStyles.css'

const Login = () =>{
    toast.configure()
    const[email, setEmail] = useState('');
    const[contraseña, setContraseña] = useState('');
    const[redirect, setRedirect] = useState(false);
    const[loginError, setLoginError] = useState(false);
    
    
    const handleOnSubmit = (e) => {
        e.preventDefault();
        
        if(!  loginError ){
                //esto es lo que voy a enviar al back
                const infotosend ={
                username: email,
                password: contraseña
            }    
            axios.post('http://127.0.0.1:8000/auth/token', infotosend).then(response => { 
                if(response.status === 200){
                console.log(response.data)
                localStorage.setItem('user', JSON.stringify(response.data))
                setRedirect(true)  
            }
            }).catch(error => {
                notify_err()
                console.log(error)
            })
        }
    }

    const notify_err = () => {
        toast.error('Email or password are invalid', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000})
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
            return <Redirect to="/Home" />
        } 
        return (
        <div>
            <div className="divCreateJoin lobby">
                <Link className="liStyle back" to="/">{`<`}</Link>
            </div>
            <div className='fom-popup-BoxShadow register'>
                <h1 style={{fontSize:"45px"}} className="h1TittleLobby">Welcome</h1>

                <form onSubmit={handleOnSubmit} className='formRegister'>
                    <div className="divTitleInput">Email</div>
                    <input
                        id='emailL'
                        type='text' 
                        name='email' 
                        placeholder='Input Email' 
                        value={email} 
                        onChange={handleOnchange} 
                    />
                    <div>
                        { loginError ? 
                            <label style={{paddingLeft:"20px"}}>Email ingresado no valido</label> : 
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