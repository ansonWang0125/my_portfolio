import React from 'react';
import './Error.css'
import {NavLink} from "react-router-dom";

const Error = () => {
    return (
        <div id='wrap'>
            <div id='Error'>
                <h1 >Please Use Another Account To Sign In <br/> Because The Same User Name Or Author Name Has Been Used In This App</h1>
                <NavLink id="Link" to={'/'}>
                    <span >Back To Main Page</span>
                </NavLink>
            </div>
        </div>
    )
}

export default Error