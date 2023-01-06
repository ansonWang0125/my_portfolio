import Head from './Head';
import React, {useEffect} from 'react';
import { UseTitleContext } from '../../Context/TitleContextProvider';

const Create = () => {
    const {changeTitle} = UseTitleContext();
    
    useEffect(() => {
        changeTitle('Create New Article');
    }, [changeTitle])
    return (
        <div className="create">
            <Head />
        </div>
    );
}

export default Create;