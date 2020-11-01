import React, {useState} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import "./register.css";

const Register = () =>{
    const[email, setEmail] = useState('');
    const[contraseña, setContraseña] = useState('');
    const[redirect, setRedirect] = useState(false);
    const[registerError, setRegisterError] = useState(true);
    const[emailAlert, setAlertEmail] = useState(false);
    
    const handleOnSubmit = (e) => {
        e.preventDefault();
        
        if(!  registerError ){
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
                
                //cuando recibo la info si el email esta en uso ya puedo configurar
                //setAlertEmail(true) y setAlertEmail(false)
                //SI EMAILALERT = 1 NO DEBO REDIRIGIR.
                
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
            setRegisterError(false)
        }else{
            setRegisterError(true)
        }
        
    }
     
        //redirect cuando el usuario se registra.
        /*
         const redirect  = this.state.redirect
        
        if(redirect){ 
            return <Redirect to="/Home" />
        } */
        return (
        <div className='Register'>
            <labe className='TitleRegister'>Crea tu Usuario aqui! :</labe>
            <form onSubmit={handleOnSubmit} className='formRegister'>
                <input className=''
                    id='email'
                    type='text' 
                    name='email' 
                    placeholder='Ingrese un Email' 
                    value={email} 
                    onChange={handleOnchange} 
                />
                <div>
                    { registerError ? <label >Email ingresado no valido</label> : <p></p>}
                </div>
                <div>
                    { emailAlert ? <label >Email ingresado no disponible por favor ingrese otro email</label> : <p>aca pongo el redirecto to /home o que ?</p>}
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
                <button type='submit'>Crear Usuario</button>
                
            </form>
        </div>
        )
    
}



export default Register;