import React from 'react';
import {UseLoginContext} from '../../Context/LoginCnt'

export default function Dashboard() {
    const {login} = UseLoginContext();
    console.log(login)
    return (
        <h2>Dashboard</h2>
    );
}