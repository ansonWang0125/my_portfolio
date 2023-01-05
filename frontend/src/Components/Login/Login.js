import React, { useState, useEffect } from 'react';
import './css/login.css';
import { useNavigate } from "react-router-dom"
// import bcrypt from 'bcryptjs';
import useData from '../App/useData';
import {UseLoginContext} from '../../Context/LoginCnt'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Login() {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [tokens, setToken] = useState();
    const [success, setSuccess] = useState(false);
    const [notfound, setNotFound] = useState(false);
    const [click, setClick] = useState();
    // const [error, setError] = useState(false);
    const {data} = useData();
    const {changeLogin} = UseLoginContext();
    const navigate = useNavigate();

    const gotoSignUpPage = () => navigate("/register");

    useEffect ( () => {
        console.log(notfound)
        if (success) {
            toast.success('登入成功 ! ', {
                position:toast.POSITION.TOP_CENTER,
                className: 'toast-success'
            })}
        if (notfound) {
            toast.info('尚未註冊 ! ', {
                position:toast.POSITION.TOP_CENTER,
                className: 'toast-info'
            })}
    }, [notfound, success, click])

    async function loginUser(credentials, token) {
        console.log('loginuser')
        return fetch('http://localhost:8080/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(credentials)
        })
         .then(function(response) {
            if (response.status === 201) {
                return response.json()
            }
            if (!response.ok) {throw new Error(response.status)}
         })
         .catch((error) => {
            console.log('error: ' + error);
         })
    }

    async function loginWithoutToken(credentials) {
        return fetch('http://localhost:8080/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials)
        })
         .then(function(response) {
            if (response.status === 201) {
                return response.json()
            }
            if (!response.ok) {throw new Error(response.status)}
         })
         .catch((error) => {
            console.log('error: ' + error);
         })
    }

    const handleLogin = async e => {
        e.preventDefault();
        var isAvailable
        console.log(data)
        if (username === data.userName && password === data.password){
            setToken(data.token)
            console.log('token')
            isAvailable = await loginUser({
                username,
            }, data.token);
        }else {
            isAvailable = await loginWithoutToken({
                username,
                password
            });
        }
        console.log('loginnn', isAvailable)
        if (isAvailable){
            setSuccess(true)
            setNotFound(false)
        } else {
            console.log('fuckki')
            setNotFound(true)
            setSuccess(false)
        }
        changeLogin(isAvailable)
        setClick(!click)

        // console.log(username, password);
    }
    return(
        <div className="login-wrapper">
            <ToastContainer />
            <h1>Please Log In</h1>
                <form onSubmit={handleLogin}>
                <label>
                    <p>Username</p>
                    <input type="text" onChange={e=> setUserName(e.target.value)}/>
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)}/>
                </label>
                <div>
                    <button type="submit" >Submit</button>
                </div>
                <p>
                    Don't have an account?{" "}
                    <span className='link' onClick={gotoSignUpPage}>
                        Sign up
                    </span>
                </p>
                </form>
        </div>
      )
}