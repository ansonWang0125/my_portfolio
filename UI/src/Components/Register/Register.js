import React, { useState, useEffect, useRef } from 'react';
import './css/signup.css';
import useData from '../App/useData';
import { useNavigate, NavLink } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {apiUserSignUp} from '../../axios/api';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { ReactComponent as GoogleLogo } from '../../assets/google.svg';
import { getGoogleUrl } from '../../utils/getGoogleUrl';
import { UseEnvContext } from '../../Context/envCnt';



export default function Register() {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(false);
    const [hassignup, setHasSignUp] = useState(false);
    const [incorrect, setIncorrect] = useState(false);
    const [emailValid, setEmailValid] = useState(true);
    const [valid, setValid] = useState(false);
    const [click, setClick] = useState(false);
    const {env} = UseEnvContext();
    const {setData} = useData();
    const navigate = useNavigate();
    const formRef = useRef()
    let from = '/login';
    const redirect_uri = env.redirect_signup
    
    

    useEffect ( () => {
        if (success) {
            toast.success('註冊成功 ! ', {
                position:toast.POSITION.TOP_CENTER,
                className: 'toast-success'
            })}
        if (hassignup) {
            toast.info('此信箱已用過 ! ', {
                position:toast.POSITION.TOP_CENTER,
                className: 'toast-info'
            })}
        if (incorrect) {
            toast.error('資料有誤 ! ', {
                position:toast.POSITION.TOP_CENTER,
                className: 'toast-error'
            })}
        if (!emailValid) {
            toast.info('Email格式有誤 ! ', {
                position:toast.POSITION.TOP_CENTER,
                className: 'toast-info'
            })}
    }, [success, hassignup, incorrect,emailValid, click])

    useEffect ( () =>{
        if (success) {
            navigate("/login")
        }
    }, [success, navigate])

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
                } else if (response.message === 'user already exists') {
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
        if (valid){
            console.log('valid')
            const response = await signupUser({
                userName,
                email,
                password
            });
            if (response.success) {
                setData(response.userData);
            }
        }
        setClick(!click)
    }
    const handleBtnClick = () => {
        let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if ( re.test(email) ) {
            setEmailValid(true)
            if ( userName && email && password){
                setValid(true)
            }
        } else { setEmailValid(false) }
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
            onSubmit={handleSubmit}
        >
            <Paper elevation={3} id='signup'>
                <div className='title'>
                    <h1>Sign up</h1>
                </div>
                <div className='signup-input'>
                <TextField
                    required
                    id="username"
                    label='User Name'
                    style={{width: 350,height:30}}
                    onChange={e=> setUserName(e.target.value)}
                />
                </div>
                <div className='signup-input'>
                <TextField
                    required
                    id="email"
                    label='Email'
                    style={{width: 350,height:30}}
                    onChange={e=> setEmail(e.target.value)}
                />
                </div>
                <div className='signup-input'>
                <TextField
                    required
                    id="password"
                    label='Password'
                    style={{width: 350,height:30}}
                    type="password"
                    onChange={e => setPassword(e.target.value)}
                />
                </div>
                <div className='signup-submit'>
                    <Button variant="contained" 
                            style={{width: 350,height:30}}
                            type="submit"
                            onClick={handleBtnClick}
                    >
                        Sing up
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
                        Sign up with Google
                    </Link>
                </div>
                <div>
                    <p>
                    Already have an account? Click {" "}
                        <NavLink to={'/login'} 
                                className='listitem'>
                        Here</NavLink>
                     </p>
                </div>
            </Paper>
        </Box>
      )
}