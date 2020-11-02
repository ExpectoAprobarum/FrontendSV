import React from 'react';
import Register from '../pages/register/register';
import Login from '../pages/login/login';
import './registerAndlogin.css'

const RegisterAndLogin = () => {
    return(
        <div className='Background'>
        <div className='RegisterAndLoginPage'>
            <Register />
            <Login />
        <div className='Background'></div>
        </div>
        </div>
        
    )
    }



export default RegisterAndLogin;