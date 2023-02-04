import React, { useState, useEffect, useRef } from 'react';
import './css/login.css';
import { useNavigate, NavLink, useLocation } from "react-router-dom"
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
import Link from '@mui/material/Link';
import { ReactComponent as GoogleLogo } from '../../assets/google.svg';
import { getGoogleUrl } from '../../utils/getGoogleUrl';
import { UseEnvContext } from '../../Context/envCnt';
import { EnvContextProvider } from '../../Context/envCnt'; 


export default function Login() {
    const [userData, setUserData] = useState();
    const [password, setPassword] = useState();
    const [success, setSuccess] = useState(false);
    const [notfound, setNotFound] = useState(false);
    const [passworderror, setPassworderError] = useState(false);
    const [click, setClick] = useState();
    // const [error, setError] = useState(false);
    const {setData} = useData();
    const {changeLogin} = UseLoginContext();
    const navigate = useNavigate();
    const {env} = UseEnvContext();
    const formRef = useRef()

    const location = useLocation();
    let from = ((location.state)?.from?.pathname) || '/';

    const redirect_uri = env?.redirect_login


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
            userData: userData,
            password
        });
        if (response.success){
            setData({token: response.token})
        }
        changeLogin(true)
        setClick(!click)
    }
    const handleBtnClick = () => {
        formRef.current.reportValidity();
    }
    return(
        <EnvContextProvider>
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
                    id="data"
                    label='User Name or Email'
                    style={{width: 350,height:30}}
                    onChange={e=> setUserData(e.target.value)}
                />
                </div>
                <div className='login-input'>
                <TextField
                    required
                    id="password"
                    label='Password'
                    type="password"
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
                <div className='google-login'>
                    <Link 
                        href={getGoogleUrl(from, redirect_uri)}
                        sx={{
                        backgroundColor: '#f5f6f7',
                        borderRadius: 1,
                        py: '0.6rem',
                        columnGap: '1rem',
                        textDecoration: 'none',
                        color: '#393e45',
                        cursor: 'pointer',
                        fontWeight: 500,
                        '&:hover': {
                            backgroundColor: '#fff',
                            boxShadow: '0 1px 13px 0 rgb(0 0 0 / 15%)',
                        },
                        }}
                        display='flex'
                        justifyContent='center'
                        alignItems='center'
                        style={{width: 350,height:30}}
                    >
                        <GoogleLogo style={{margin:'3%'}}/>    
                        Login with Google
                    </Link>
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
        </EnvContextProvider>
      )
}