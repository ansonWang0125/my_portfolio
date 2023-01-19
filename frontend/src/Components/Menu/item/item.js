import {navData} from "../../../lib/navData";
import {NavLink} from "react-router-dom";
import React from 'react';
import styles from'./css/menu.module.css'
import {UseLoginContext} from '../../../Context/LoginCnt';
import './css/nav.css';
const Item = () => {
    const {login} = UseLoginContext();
    
    return (
        <div id='navbarToggleExternalContent' >
            <div className={styles.sidenav}>
                {navData.map(item =>{
                    return  (login || !item.needLogin)?(<NavLink key={item.id} className={styles.sideitem} to={item.link}>
                                <span className={styles.linkText}>{item.text}</span>
                            </NavLink>):(<div key={item.id}></div >)
                })}

            </div>
        </div>
    );
}

export default Item