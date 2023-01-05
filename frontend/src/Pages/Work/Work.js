import React from 'react';
import Head from './Head';
import { UseTitleContext } from '../../Context/TitleContextProvider';

const Work = () => {
    const {changeTitle} = UseTitleContext();
    changeTitle('Work');
    return (
        <div className="Work">
            <Head />
        </div>
    );
}

export default Work;