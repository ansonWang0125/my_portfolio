import Head from './Head';
import Body from './Body';
import React, {useEffect} from 'react';
import { UseTitleContext } from '../../Context/TitleContextProvider';
import './css/Profile.css'

export default function Profile () {
    const {changeTitle} = UseTitleContext();
    
    useEffect(() => {
        changeTitle('Profile');
    }, [changeTitle])
    return (
        <div className="profile">
            <Head />
            <Body />
        </div>
    )
}