import React from 'react';
import { Link } from 'react-router-dom';

import './registerAndlogin.css';
import '../pages/creategame/buttonStyle.css'
//import '../pages/joinagame/styleSearch.css'

const RegisterAndLogin = () => {
    return(
      <div className="DivRegisterandLogin">
        <div className='DivCreateRegisterandL'>
          <h1 style={{paddingBottom: "50px", fontSize:"100px"}}>Secret Voldemort</h1>
        </div>
        <div className="button-container-1">
          <span className="mas">Register</span>
          <button id="work" type="button" name="Hover">
            <Link to={{pathname: '/register'}} type="button"
              className="linked">Register
            </Link>
          </button>
        </div>
        
        <div className="button-container-1">
          <span className="mas">Login</span>
          <button id="work" type="button" name="Hover">
            <Link to={{pathname: '/login'}} type="button"
              className="linked">Login
            </Link>
          </button>
        </div>
      </div>
    )
}

export default RegisterAndLogin;
