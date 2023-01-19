import React from 'react';
import MuiMenu from '@mui/icons-material/Menu';
import './css/nav.css';
import {useState, useEffect} from 'react';
import {NavLink} from "react-router-dom";
import {logData} from "../../../lib/loginData";
import styles from'./css/menu.module.css';
import {UseLoginContext} from '../../../Context/LoginCnt';
import { toast } from 'react-toastify';
import AccountMenu from '../../AccountMenu/AccountMenu';

const Icon = () => {

    const [menu, setMenu] = useState(0)
    const {login, changeLogin} = UseLoginContext();
    const [loginData, logoutData] = logData
    const [click, setClick] = useState(false)
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
        if (!login && click) {
            toast.success('已登出 ! ', {
                position:toast.POSITION.TOP_CENTER,
                className: 'toast-success'
            })}
    }, [login, click])

    const logout = () =>{
        localStorage.removeItem('user');
        changeLogin(false)
    }

    const handleLogout = async e => {
        //e.preventDefault(); // 停止事件
        setClick(!click)
        logout()
    }
    
    return (
        <nav className="navbar">
            <button className="navbar-toggler" type="button" onClick={ toggleMenu} >
                <MuiMenu  sx={{ color: "white", backgroundColor: "#0E0C5D " }} className='muiMenu'/>
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="user-control">
                { !login?
                    (<div className='navbar-login'>
                        <NavLink key={loginData.id} className={styles.login} to={loginData.link}>
                            {loginData.icon}
                            <span className={styles.linkText}>{loginData.text}</span>
                        </NavLink>
                    </div>)
                    :
                    (<div className='navbar-logout'>
                        <NavLink key={logoutData.id} className={styles.login} to={logoutData.link} onClick={handleLogout}>
                            {logoutData.icon}
                            <span className={styles.linkText}>{logoutData.text}</span>
                        </NavLink>
                </div>)
                }
                <div className='accountMenu'>
                    <AccountMenu />
                </div>
            </div>
        </nav>
    );
}

export default Icon