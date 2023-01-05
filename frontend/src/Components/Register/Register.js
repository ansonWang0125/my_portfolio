import React, { useState, useEffect } from 'react';
import './css/signup.css';
// import bcrypt from 'bcryptjs';
import useData from '../App/useData';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();
    const [success, setSuccess] = useState();
    const [hassignup, setHasSignUp] = useState(false);
    const [incorrect, setIncorrect] = useState(false);
    const [click, setClick] = useState();
    const {data,setData} = useData();
    const navigate = useNavigate();

    const gotoLoginPage = () => navigate("/");

    useEffect ( () => {
        console.log(hassignup)
        if (success) {
            toast.success('註冊成功 ! ', {
                position:toast.POSITION.TOP_CENTER,
                className: 'toast-success'
            })}
        if (hassignup) {
            toast.info('已經註冊 ! ', {
                position:toast.POSITION.TOP_CENTER,
                className: 'toast-info'
            })}
        if (incorrect) {
            toast.error('資料有誤 ! ', {
                position:toast.POSITION.TOP_CENTER,
                className: 'toast-error'
            })}
    }, [success, hassignup, incorrect, click])

    async function signupUser(credentials) {
        console.log('signup',credentials)
        return fetch('http://localhost:8080/api/users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
        .then(response => response.json())
        .then(function(response) {
            // console.log('fuckyyyyy',response)
            if (response.success) {
                setHasSignUp(false)
                setSuccess(true)
                return response
            } else if (!response.success){
                console.log('fuckyou')
                console.log(response.message.message)
                if ( response.message === "Details are not correct") {
                    setSuccess(false)
                    setIncorrect(true)
                } else if (response.message.message === 'username already exists') {
                    console.log('fuckyouyou')
                    setSuccess(false)
                    setHasSignUp(true)
                }
                return response
            }
            if (!response.ok) {throw new Error(response.status)}
         })
         .catch((error) => {
            console.log('error: ' + error);
         })
    }
    

    const handleSubmit = async e => {
        e.preventDefault();
        console.log('try',data)
        const response = await signupUser({
            userName,
            password
        });
        console.log(response)
        if (response.success) {
            const userData = response.userData
            console.log('user', userData)
            setData(userData);
            console.log('register',data)
        }
        setClick(!click)
    }
    return(
        <div className="signup-wrapper">
            <ToastContainer />
            <h1>Sign Up</h1>
                <form onSubmit={handleSubmit}>
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
                    Already have an account?{" "}
                    <span className='link' onClick={gotoLoginPage}>
                        Login
                    </span>
                </p>
                </form>
        </div>
      )
}