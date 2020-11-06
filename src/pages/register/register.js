import React, {useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // prueba
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import "./register.css";
import '../lobby/LobbyStyles.css'

const Register = () =>{
    
    toast.configure()
    const[usuario, setUsuario] = useState('')
    const[email, setEmail] = useState('');
    const[contraseña, setContraseña] = useState('');
    const[registerError, setRegisterError] = useState(false);

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
                notify()
                
            }
            }).catch(error => {
                notify_err()
                console.log(error)
            })
        }
    }
    const notify_err = () => {
        toast.error('User or Email was already in use', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000})
    }

    const notify = () => {
        toast.success('The user was successfully created', {
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
            <div>
                <div className="divCreateJoin lobby">
                    <Link className="liStyle back" to="/">{`<`}</Link>
                </div>
                <div className='fom-popup-BoxShadow register'>
                    <h1 style={{fontSize:"45px"}} className="h1TittleLobby">Sign in</h1>

                    <form onSubmit={handleOnSubmit} className='formRegister'>
                        <div className="divTitleInput">User</div>
                        <input
                            id='usuarioR'
                            type='text' 
                            name='usuario' 
                            placeholder='Input a username' 
                            value={usuario} 
                            onChange={handleOnchange} 
                        />
                        <br/>
                        <br/>
                        <div className="divTitleInput">Email</div>
                        <input
                            id='emailR'
                            type='text' 
                            name='email' 
                            placeholder='Input Email' 
                            value={email} 
                            onChange={handleOnchange} 
                        />
                        <div>
                            { registerError ? 
                                <label style={{paddingLeft:"20px"}}>Email ingresado no valido</label> : 
                                <p></p> }
                        </div>
                        <br />
                        <div className="divTitleInput">Password</div>
                        <input  className="input2"
                            id='contraseñaR'
                            type='password' 
                            name='contraseña' 
                            placeholder='Input Password' 
                            value={contraseña} 
                            onChange={handleOnchange} 
                            minLength="7"
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