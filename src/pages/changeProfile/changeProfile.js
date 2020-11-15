
import React, {useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {notify_user_update_invalidPass,  
  notify_user_update_succ} 
  from '../../commons/alerts/toast';
import configData from '../../config.json';
import './changeProfile.css';

const ChangeProfile = () => {
  const[passwordOld, setPasswordOld] = useState('');
  const[passwordNew, setpasswordNew] = useState('');
  const[userAlias, setUserAlias] = useState('');
  const[showMe, setShowMe] = useState(false);
  const[error, setError] = useState(false);
  
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const usertoken = localStorage.getItem('user')
  
    const infotosend= {
      useralias:userAlias ,
      oldpassword:passwordOld,
      newpassword:passwordNew
    }
    axios.put(configData.API_URL + '/users', infotosend, {
      headers: {
        'Authorization': `Bearer ${JSON.parse(usertoken).access_token}` 
      }
    }).then(response => { 
      if(response.status === 200){
        notify_user_update_succ()
        console.log(response)
      }
    })
    .catch(error => {
      notify_user_update_invalidPass()
      setError(true)
    })
  }
  const handleOnchange = (e) => {
    if(e.target.name === 'userAlias'){
      setUserAlias(e.target.value)
    }
    else if(e.target.name === 'passwordNew'){
      setpasswordNew(e.target.value)
    }
    else if( e.target.name === 'passwordOld') {
      setPasswordOld(e.target.value)
    }
    else if(e.target.name === 'showMe'){
      setShowMe(true)
    }
    else if(e.target.name === 'cancel') {
      setShowMe(false)
      setError(false)
      setpasswordNew('')
      setPasswordOld('')
    }
  }

    return (
        <div >
          <div className='fom-popup-BoxShadow changeProfile'>
            <Link className="fromProfiletohome back" to="/home">{`<`}</Link>
            
            <form className='formChangeProfile' onSubmit={handleOnSubmit} >
              <div className="divTitleInput">Change UserAlias: </div>
                <input 
                  id='userAliasL'
                  type='text' 
                  name='userAlias' 
                  placeholder= {userAlias }
                  value={userAlias} 
                  onChange={handleOnchange} 
                  required>
                </input>
                <br />
                <br />
                <button type='submit'>Save</button>
                <br />
                <br />

                {showMe ? 
                    <div >
                      <div className="divTitleInput">Change Password: </div>
                      <input  
                        id='passwordOld'
                        type='password'
                        name='passwordOld'
                        placeholder='Input your password'
                        value={passwordOld}
                        onChange= {handleOnchange}
                        minLength="7"
                        required
                      />
                      <br />
                      <br />
                      <input  
                        id='passwordnew'
                        type='password'
                        name='passwordNew'
                        placeholder='Input your new password'
                        onChange= {handleOnchange}
                        value={passwordNew}
                        minLength="7"
                        required
                      />
                      <br />
                      <br />
                      <button 
                        onClick={handleOnchange}
                        name='cancel'> cancel </button>
                      <br />
                      <br />
                      <button  type='submit' name='password' >Save</button>
                    </div>
                    : 
                    <button 
                      onClick={handleOnchange} 
                      name='showMe' >Change password</button>
                }
                {error ? <label>
                  Error: Caracteres ingresados invalidos
                </label> 
                : <p></p>}
            </form>
          </div>
        </div>
    )
}

export default ChangeProfile;