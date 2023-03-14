import React from 'react';
import MuiMenu from '@mui/icons-material/Menu';
import './css/nav.css';
import {useState, useEffect} from 'react';
import  { useNavigate, NavLink} from "react-router-dom";
import {logData} from "../../../lib/loginData";
import styles from'./css/menu.module.css';
import {UseLoginContext} from '../../../Context/LoginCnt';
import { toast } from 'react-toastify';
import AccountMenu from '../../AccountMenu/AccountMenu';
import { removeToken } from '../../../Cookies/cookies';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { apiVerify } from '../../../axios/api';

const Icon = () => {

    const [menu, setMenu] = useState(0)
    const {login, changeLogin} = UseLoginContext();
    const [loginData, logoutData] = logData
    const [click, setClick] = useState(false)
    const [verifyClick, setVerifyClick] = useState(false)
    const [open, setOpen] = React.useState(false);
    const [hasverify, setVerify] = useState(false);
    const [error, setError] = useState(false);
    const [password, setPassword] = useState("");
    const [isclicking, setIsclicking] = useState(false);
    const navigate = useNavigate();

    async function verifyRequest (credentials)  {
        return apiVerify(credentials)
         .then(response=> {
            if (response.status === 201) {
                return response.data
            }
            if (!response.ok) {throw new Error(response.status)}
         })
         .catch((error) => {
            console.log('error: ' + error);
         })
    }

    const toggleMenu = () => {
        let menus = document.getElementById('navbarToggleExternalContent')
        if (menu){
            menus.classList.add('menu-show');
        }
        else {
            menus.classList.remove('menu-show');
        }
        setMenu( !menu );
    }

    useEffect ( () => {
        if (!login && click && isclicking) {
            toast.success('已登出 ! ', {
                position:toast.POSITION.TOP_CENTER,
                className: 'toast-success'
            })}
        if (hasverify) {
            toast.success('驗證成功 ! ', {
                position:toast.POSITION.TOP_CENTER,
                className: 'toast-success'
            }); navigate(loginData.link)}
        if (error) {
            toast.info('驗證失敗 ! ', {
                position:toast.POSITION.TOP_CENTER,
                className: 'toast-success'
            })}
        if (isclicking)
            setIsclicking(false)
    }, [login, click, hasverify, verifyClick, loginData.link, navigate, error, isclicking])

    const logout = () =>{
        localStorage.removeItem('user');
        removeToken()
        changeLogin(false)
    }

    const handleLogout = async e => {
        //e.preventDefault(); // 停止事件
        setClick(!click)
        logout()
    }


    const handleOpen = (e) => {
        e.preventDefault()
        setOpen(true);
    }

    const handleVerify = async (e) => {
        e.preventDefault()
        if (password){
            const response = await verifyRequest({password})
            if (response.success) {
                setVerify(true)
                setError(false)
                setOpen(false);
                setVerifyClick(!verifyClick)
            }else {
                setVerify(false)
                setError(true)
                setOpen(false);
                setVerifyClick(!verifyClick)
            }
        }
    }

    const handleClose = () => {
        setOpen(false);
    };
    
    return (
        <nav className="navbar">
            <button className="navbar-toggler" type="button" onClick={ toggleMenu} >
                <MuiMenu  sx={{ color: "white", backgroundColor: "#0E0C5D " }} className='muiMenu'/>
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="user-control">
                { !login?
                    (<div className='navbar-login'>
                         <NavLink key={loginData.id} className={styles.login} to={loginData.link} onClick={handleOpen}>
                            {loginData.icon}
                            <span className={styles.linkText}>{loginData.text}</span>
                        </NavLink>
                    </div>)
                    :
                    (<><div className='navbar-logout'>
                        <NavLink key={logoutData.id} className={styles.login} to={logoutData.link} onClick={handleLogout}>
                            {logoutData.icon}
                            <span className={styles.linkText}>{logoutData.text}</span>
                        </NavLink>
                    </div>
                    <div className='accountMenu'>
                        <AccountMenu />
                    </div>   
                    </>)
                }
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Please Enter Verify Password</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    To login to this website, please enter the password. You can get the password from the administrator of the website.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Password"
                    type="password"
                    fullWidth
                    variant="standard"
                    onInput={e=>setPassword(e.target.value)}
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleVerify}>Confirm</Button>
                </DialogActions>
        </Dialog>
        </nav>
    );
}

export default Icon