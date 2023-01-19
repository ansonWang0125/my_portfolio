import React, { useState, useEffect, useRef } from 'react';
import './css/login.css';
import { useNavigate, NavLink } from "react-router-dom"
// import bcrypt from 'bcryptjs';
import useData from '../App/useData';
import {UseLoginContext} from '../../Context/LoginCnt'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {apiUserLogin} from '../../axios/api';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';



export default function Login() {
    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();
    const [success, setSuccess] = useState(false);
    const [notfound, setNotFound] = useState(false);
    const [passworderror, setPassworderError] = useState(false);
    const [click, setClick] = useState();
    // const [error, setError] = useState(false);
    const {setData} = useData();
    // const {setProfile} = useProfile();
    const {changeLogin} = UseLoginContext();
    const navigate = useNavigate();
    const formRef = useRef()


    useEffect ( () => {
        if (success) {
            toast.success('登入成功 ! ', {
                position:toast.POSITION.TOP_CENTER,
                className: 'toast-success'
            })
            console.log('success')
            navigate('/')
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
    const handleBtnClick = () => {
        formRef.current.reportValidity();
    }
    return(
        <Box 
            sx={{
            display: 'flex',
            flexWrap: 'wrap',
            '& > :not(style)': {
              m: 1,
              width: 600,
              height: 800,
            },
            '& .MuiTextField-root': { m: 1, width: '25ch' }
             }}
             ref={formRef}
            component="form"
            noValidate
            autoComplete="off"
            className='box'
            onSubmit={handleLogin}
        >
            <Paper elevation={3} id='login'>
                <div className='title'>
                    <h1>Login</h1>
                </div>
                <div className='login-input'>
                <TextField
                    required
                    id="outlined-required"
                    label='User Name'
                    style={{width: 350,height:30}}
                    onChange={e=> setUserName(e.target.value)}
                />
                </div>
                <div className='login-input'>
                <TextField
                    required
                    id="outlined-required"
                    label='Password'
                    style={{width: 350,height:30}}
                    onChange={e => setPassword(e.target.value)}
                />
                </div>
                <div className='login-submit'>
                    <Button variant="contained" 
                            style={{width: 350,height:30}}
                            type="submit"
                            onClick={handleBtnClick}
                    >
                        Login
                    </Button>
                </div>
                <div>
                    <p>
                        Don't have an account? Click {" "}
                        <NavLink to={'/register'} 
                                className='listitem'>
                        Here</NavLink>
                     </p>
                </div>
            </Paper>
        </Box>
      )
}