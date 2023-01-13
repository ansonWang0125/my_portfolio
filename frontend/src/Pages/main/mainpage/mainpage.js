import Head from './Head';
import Body from './Body';
import React, {useEffect} from 'react';
import { UseTitleContext } from '../../../Context/TitleContextProvider';
import './css/mainpage.css'

const Mainpage = () => {
    const {changeTitle} = UseTitleContext();
    
    useEffect(() => {
        changeTitle('My Portfolio');
    }, [changeTitle])
    return (
        <div className="main">
            <Head />
            <Body />
        </div>
    );
}

export default Mainpage;