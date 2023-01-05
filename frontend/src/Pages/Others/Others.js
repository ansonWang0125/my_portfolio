import React from 'react';
import Head from './Head';
import { UseTitleContext } from '../../Context/TitleContextProvider';

const Others = () => {
    const {changeTitle} = UseTitleContext();
    changeTitle('Other Article');
    return (
        <div className="Others">
            <Head />
        </div>
    );
}

export default Others;