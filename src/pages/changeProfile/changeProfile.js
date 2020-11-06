
import React, {useState} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import jwt_decode from 'jwt-decode';
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

//como desisntalo esto ?
//import { useToasts } from 'react-toast-notifications'
//import { useAlert } from "react-alert";

const ChangeProfile = () => {
    toast.configure()
    const usertoken = localStorage.getItem('user')
    const quees = jwt_decode(usertoken).sub.password;
    
    const[passwordOld, setPasswordOld] = useState('')
    const[passwordNew, setpasswordNew] = useState('')
    // el valor default tiene que cambiar cdo el back este implementado
    const[userAlias, setUserAlias] = useState('Default')
    const[showMe, setShowMe] = useState(false)
    const[error, setError] = useState(false)
    const[success, setSuccess] = useState(true)

    const handleOnSubmit = (e) => {
        e.preventDefault();
        console.log("Password nueva:", passwordNew)
        console.log("Password vieja:", passwordOld)
        console.log("alias del usuario:", userAlias)
        if((quees !== passwordOld) && showMe) {
            setError(true)
            console.log("Error imprime esto ")
        }
        else {
            //acomodar esto cdo este el endpoint
            setError(false)
            notify()
            /*
            axios.post('http://127.0.0.1:8000/ponerendpoint',(passwordNew, userAlias), {
            headers: {
                'Authorization': `Bearer ${JSON.parse(usertoken).access_token}` 
            }
        }).then(response => { 
            if(response.status === 200){
                //avisar del success
                setSuccess(true)
            }
        })
        .catch(error => {
           console.log(error)
        })*/
        }
    }
    
    const notify = () => {
        toast.success('Your changes have been updated', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000})
    }
    
    const handleOnchange = (e) => {
        if(e.target.name === 'userAlias'){
            setUserAlias(e.target.value)
        }
        else if(e.target.name === 'passwordNew'){
            setpasswordNew(e.target.value)
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
        else if( e.target.name === 'passwordOld') {
            setPasswordOld(e.target.value)
        }
    }

    return (
        <div>
            <form className='ChangeProfileForm' onSubmit={handleOnSubmit} >
                <input id='userAliasL'
                        type='text' 
                        name='userAlias' 
                        placeholder= {userAlias }
                        value={userAlias} 
                        onChange={handleOnchange} >
                    </input>
                <br />
                <button type='submit' >Save</button>
                <br />
                <br />
                {showMe ? 
                    <div>
                        <input  
                            id='passwordOld'
                            type='password'
                            name='passwordOld'
                            placeholder='Input your password'
                            value={passwordOld}
                            onChange= {handleOnchange}
                            minLength="7"
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
                        />
                        <br />
                        <button onClick={ handleOnchange} name='cancel'>cancel</button>
                        <button type='submit' name='password'>Save</button>
                    </div>
                    : <button onClick={ handleOnchange} name='showMe'>Change password</button>}
                {error ? <label>Error: Caracteres ingresados invalidos</label>:<p></p>}
            </form>
        </div>
    )
}

export default ChangeProfile;