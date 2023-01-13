import React, {useEffect} from 'react';
import Head from './Head';
import Body from './Body';
import { UseTitleContext } from '../../Context/TitleContextProvider';

const Work = () => {
    const {changeTitle} = UseTitleContext();
    useEffect(() => {
        changeTitle('Work');
    }, [changeTitle])
    return (
        <div className="Work">
            <Head />
            <Body />
        </div>
    );
}

export default Work;