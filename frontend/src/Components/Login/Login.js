import React, { useState, useEffect } from 'react';
import './css/login.css';
import { useNavigate } from "react-router-dom"
// import bcrypt from 'bcryptjs';
import useData from '../App/useData';
import {UseLoginContext} from '../../Context/LoginCnt'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {apiUserLogin} from '../../axios/api';


export default function Login() {
    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();
    const [success, setSuccess] = useState(false);
    const [notfound, setNotFound] = useState(false);
    const [passworderror, setPassworderError] = useState(false);
    const [click, setClick] = useState();
    // const [error, setError] = useState(false);
    const {setData} = useData();
    const {changeLogin} = UseLoginContext();
    const navigate = useNavigate();

    const gotoSignUpPage = () => navigate("/register");

    useEffect ( () => {
        if (success) {
            toast.success('登入成功 ! ', {
                position:toast.POSITION.TOP_CENTER,
                className: 'toast-success'
            })
            console.log('success')
            navigate('/main')
        }
        if (notfound) {
            toast.info('尚未註冊 ! ', {
                position:toast.POSITION.TOP_CENTER,
                className: 'toast-info'
            })}
        if (passworderror) {
            toast.warning('密碼有誤 ! ', {
                position:toast.POSITION.TOP_CENTER,
                className: 'toast-warning'
            })}
    }, [notfound, success, passworderror, click, navigate,changeLogin])

    async function loginUser(credentials) {
        return apiUserLogin(credentials)
         .then(response=> {
            if (response.status === 201) {
                return response.data
            }
            if (!response.ok) {throw new Error(response.status)}
         })
         .then(function(response) {
            console.log(response)
            if (response.success) {
                setSuccess(true)
                setNotFound(false)
                setPassworderError(false)
            } else if (!response.success) {
                if (response.message === 'Password incorrect'){
                    setSuccess(false)
                    setNotFound(false)
                    setPassworderError(true)
                } else if (response.message === 'User name not found'){
                    setSuccess(false)
                    setNotFound(true)
                    setPassworderError(false)
                }
            }
            return response
         })
         .catch((error) => {
            console.log('error: ' + error);
         })
    }

    const handleLogin = async e => {
        e.preventDefault();
        const response = await loginUser({
            userName,
            password
        });
        if (response.success){
            setData({userName:userName, password:password, token: response.token})
        }
        changeLogin(true)
        setClick(!click)
    }
    return(
        <div className="login-wrapper">
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