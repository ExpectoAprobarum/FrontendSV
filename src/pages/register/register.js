import React, {useState} from 'react';
import axios from 'axios';
import "./register.css";

const Register = () =>{
    const[usuario, setUsuario] = useState('')
    const[email, setEmail] = useState('');
    const[contraseña, setContraseña] = useState('');
    const[registerError, setRegisterError] = useState(true);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        
        if(!  registerError ){
                //esto es lo que voy a enviar al back
                const infotosend ={
                username: usuario,
                email: email,
                password: contraseña
                } 
            console.log(infotosend)       
            axios.post('http://127.0.0.1:8000/users/', infotosend ).then(response => { 
            if(response.status === 200){
                console.log(response.data) 
                localStorage.setItem('user', JSON.stringify(response.data))
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
        else if(e.target.name === 'usuario'){
            setUsuario(e.target.value)
        }
        
        if(  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(email) ){
            setRegisterError(false)
        }else{
            setRegisterError(true)
        }
        
    }
     
        return (
        <div className='Register'>
            <form onSubmit={handleOnSubmit} className='formRegister'>
                <input className='UsuarioR'
                    id='usuarioR'
                    type='text' 
                    name='usuario' 
                    placeholder='Ingrese un Usuario' 
                    value={usuario} 
                    onChange={handleOnchange} 
                />
                <br/>
                <br/>
                <input className='EmailR'
                    id='emailR'
                    type='text' 
                    name='email' 
                    placeholder='Ingrese un Email' 
                    value={email} 
                    onChange={handleOnchange} 
                />
                <div>
                    { registerError ? <label >Email ingresado no valido</label> : <p></p>}
                </div>
                <br />
                <input 
                    id='contraseñaR'
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