import Head from './Head';
import React, {useEffect} from 'react';
import { UseTitleContext } from '../../Context/TitleContextProvider';

const Mainpage = () => {
    const {changeTitle} = UseTitleContext();
    
    useEffect(() => {
        changeTitle('My Portfolio');
    }, [changeTitle])
    return (
        <div className="main">
            <Head />
        </div>
    );
}

export default Mainpage;