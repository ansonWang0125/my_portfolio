import React, { useState, useEffect } from 'react';
import './css/signup.css';
// import bcrypt from 'bcryptjs';
import useData from '../App/useData';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {apiUserSignUp} from '../../axios/api';

export default function Register() {
    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();
    const [success, setSuccess] = useState();
    const [hassignup, setHasSignUp] = useState(false);
    const [incorrect, setIncorrect] = useState(false);
    const [click, setClick] = useState();
    const {setData} = useData();
    const navigate = useNavigate();

    const gotoLoginPage = () => navigate("/login");

    useEffect ( () => {
        if (success) {
            toast.success('註冊成功 ! ', {
                position:toast.POSITION.TOP_CENTER,
                className: 'toast-success'
            })}
        if (hassignup) {
            toast.info('使用者名稱已用過 ! ', {
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
        return apiUserSignUp(credentials)
        .then(function(response) {
            if (response.status === 201) {
                return response.data
            }
            if (!response.ok) {throw new Error(response.status)}
         })
        .then(function(response) {
            if (response.success) {
                setHasSignUp(false)
                setIncorrect(false)
                setSuccess(true)
            } else if (!response.success){
                if ( response.message === "Details are not correct") {
                    setSuccess(false)
                    setHasSignUp(false)
                    setIncorrect(true)
                } else if (response.message === 'username already exists') {
                    setSuccess(false)
                    setIncorrect(false)
                    setHasSignUp(true)
                }
            }
            return response
         })
         .catch((error) => {
            console.log('error: ' + error);
         })
    }
    

    const handleSubmit = async e => {
        e.preventDefault();
        const response = await signupUser({
            userName,
            password
        });
        if (response.success) {
            setData(response.userData);
        }
        setClick(!click)
    }
    return(
        <div className="signup-wrapper">
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