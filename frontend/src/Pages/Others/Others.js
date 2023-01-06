import React, {useEffect} from 'react';
import Head from './Head';
import { UseTitleContext } from '../../Context/TitleContextProvider';

const Others = () => {
    const {changeTitle} = UseTitleContext();
    useEffect(() => {
        changeTitle('Others Articles');
    }, [changeTitle])
    return (
        <div className="Others">
            <Head />
        </div>
    );
}

export default Others;