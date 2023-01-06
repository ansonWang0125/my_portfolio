import React, {useEffect} from 'react';
import Head from './Head';
import { UseTitleContext } from '../../Context/TitleContextProvider';

const Work = () => {
    const {changeTitle} = UseTitleContext();
    useEffect(() => {
        changeTitle('Work');
    }, [changeTitle])
    return (
        <div className="Work">
            <Head />
        </div>
    );
}

export default Work;