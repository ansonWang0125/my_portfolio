import Head from './Head';
import Body from './Body';
import React, {useEffect} from 'react';
import { UseTitleContext } from '../../Context/TitleContextProvider';
import './css/MyAccount.css'

export default function My_Account () {
    const {changeTitle} = UseTitleContext();
    
    useEffect(() => {
        changeTitle('My Account');
    }, [changeTitle])
    return (
        <div className="MyAccount">
            <Head />
            <Body />
        </div>
    )
}