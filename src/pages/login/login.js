import React, {useState} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import "./login.css";

const Login = () =>{
    const[email, setEmail] = useState('');
    const[contraseña, setContraseña] = useState('');
    const[redirect, setRedirect] = useState(false);
    const[loginError, setLoginError] = useState(true);
    
    
    const handleOnSubmit = (e) => {
        e.preventDefault();
        
        if(!  loginError ){
                //esto es lo que voy a enviar al back
                console.log("entro al if")
                const infotosend ={
                email: email,
                contraseña: contraseña
            }    
            axios.post('https://jsonplaceholder.typicode.com/todos', {infotosend} ).then(response => { 
            if(response.status === 201){
                
                //aca deberia hacer algo si esta todo bien(?).
                console.log(response.data) 
                localStorage.setItem('user', JSON.stringify(response.data))
                setRedirect(true)  
            }
            }).catch(error => {
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
        
        if(  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(email) ){
            setLoginError(false)
        }else{
            setLoginError(true)
        }
        
    }
     
        //redirect cuando el usuario se loguea.
        /*
         const redirect  = this.state.redirect
        
        if(redirect){ 
            return <Redirect to="/Home" />
        } */
        return (
        <div className='Login'>
            <form onSubmit={handleOnSubmit} className='formLogin'>
                <input className=''
                    id='email'
                    type='text' 
                    name='email' 
                    placeholder='Ingrese su Email' 
                    value={email} 
                    onChange={handleOnchange} 
                />
                <div>
                    { loginError ? <label className='lbl-nombre'>Email ingresado no valido</label> : <p></p>}
                </div>
                <br />
                <input 
                    id='contraseña'
                    type='password' 
                    name='contraseña' 
                    placeholder='Ingrese su Contraseña' 
                    value={contraseña} 
                    onChange={handleOnchange} 
                    minLength="7"
                />
                <button type='submit'>Ingresar</button>
                
            </form>
        </div>
        )
    
}



export default Login;