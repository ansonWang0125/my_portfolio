import React from 'react';
import MuiMenu from '@mui/icons-material/Menu';
import './css/nav.css';
import {useState} from 'react';
import {NavLink} from "react-router-dom";
import {loginData} from "../../../lib/loginData"
import styles from'./css/menu.module.css'

const Icon = () => {

    const [menu, setMenu] = useState(0)
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
    
    return (
        <nav className="navbar">
            <button className="navbar-toggler" type="button" onClick={ toggleMenu} >
                <MuiMenu  sx={{ color: "white", backgroundColor: "#0E0C5D " }} className='muiMenu'/>
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className='navbar-login'>
                {loginData.map(item =>{
                    return <NavLink key={item.id} className={styles.login} to={item.link}>
                                {item.icon}
                                <span className={styles.linkText}>{item.text}</span>
                            </NavLink>
                })}
            </div>
        </nav>
    );
}

export default Icon