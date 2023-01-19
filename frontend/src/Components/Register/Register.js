import React, { useState, useEffect, useRef } from 'react';
import './css/signup.css';
// import bcrypt from 'bcryptjs';
import useData from '../App/useData';
// import useProfile from '../App/useProfile';
import { useNavigate, NavLink } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {apiUserSignUp} from '../../axios/api';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import usePost from '../../hooks/usePost';
// import { GoogleLogin } from 'react-google-login';
// import { gapi } from 'gapi-script';
// import GoogleIcon from '@mui/icons-material/Google';

export default function Register() {
    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();
    const [success, setSuccess] = useState();
    const [hassignup, setHasSignUp] = useState(false);
    const [incorrect, setIncorrect] = useState(false);
    const [click, setClick] = useState();
    const {setData} = useData();
    // const {setProfile} = useProfile();
    const navigate = useNavigate();
    const formRef = useRef()
    const { handleGoogle, loading, error } = usePost('signup');
    
    useEffect(() => {
        /* global google */
        if (window.google) {
          google.accounts.id.initialize({
            client_id: process.env.REACT_APP_CLIENT_ID,
            callback: handleGoogle,
          });
    
          google.accounts.id.renderButton(document.getElementById("signUpDiv"), {
            type: "icon",
            theme: "filled_blue",
            // size: "small",
            text: "continue_with",
            shape: "pill",
          });
    
          // google.accounts.id.prompt()
        }
      }, [handleGoogle]);
    
    
    // useEffect(() => {
    //     const initClient = () => {
    //           gapi.client.init({
    //           clientId: process.env.REACT_APP_CLIENT_ID,
    //           scope: ''
    //         });
    //      };
    //      gapi.load('client:auth2', initClient);
    //  });

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
                navigate("/login")
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
    const handleBtnClick = () => {
        formRef.current.reportValidity();
    }
    // const onSuccess = (res) => {
    //     console.log('success:', res);
    //     const result = res?.profileObj
    //     const token = res?.tokenId;
    //     setProfile({result: result, token: token})
    //     navigate("/")
    // };
    // const onFailure = (err) => {
    //     console.log('failed:', err);
    // };
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
                    id="outlined-required"
                    label='User Name'
                    style={{width: 350,height:30}}
                    onChange={e=> setUserName(e.target.value)}
                />
                </div>
                <div className='signup-input'>
                <TextField
                    required
                    id="outlined-required"
                    label='Password'
                    style={{width: 350,height:30}}
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
                {/* <GoogleLogin
                    clientId={process.env.REACT_APP_CLIENT_ID}
                    // buttonText='Sign in with google'
                    render={(renderProps) => (
                        <Button
                            color="primary"
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                            startIcon={<GoogleIcon />}
                            variant='contained'
                            style={{width: 350,height:30}}
                        >
                            Login with Google
                        </Button>
                    )}
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                /> */}
                <main
                    style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                    }}
                >
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    {loading ? (
                    <div>Loading....</div>
                    ) : (
                    <div id="signUpDiv" data-text="signup_with"></div>
                    )}
                </main>
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