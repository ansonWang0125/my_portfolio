import {navData} from "../../../lib/navData";
import {NavLink} from "react-router-dom";
import React from 'react';
import styles from'./css/menu.module.css'
import './css/nav.css';

export default class Item extends React.Component {
    render() {
    
    return (
        <div id='navbarToggleExternalContent' >
            <div className={styles.sidenav}>
                {navData.map(item =>{
                    return <NavLink key={item.id} className={styles.sideitem} to={item.link}>
                                <span className={styles.linkText}>{item.text}</span>
                            </NavLink>
                })}
            </div>
        </div>
    );
    }
}