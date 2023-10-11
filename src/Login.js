import React from 'react'
import "./Login.css";
import Logo from "./assets/logo.png";
import { Button } from '@mui/material';
import { auth, provider, signInWithPopup } from './firebase';

const Login = () => {

    const signIn = () => {

        signInWithPopup(auth, provider).catch((error) => alert(error.message));
    }
  return (
    <div className='login'>
        <div className="login__logo">
            <img src={Logo} alt="" />
        </div>
        <Button onClick={signIn}>Sign In</Button>

    </div>


  )
}

export default Login
