import Head from './Head';
import React from 'react';
import { UseTitleContext } from '../../Context/TitleContextProvider';

const Mainpage = () => {
    const {changeTitle} = UseTitleContext();
    changeTitle('My portfolio');
    return (
        <div className="main">
            <Head />
        </div>
    );
}

export default Mainpage;