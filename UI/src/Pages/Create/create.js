import Head from './Head';
import Body from './Body';
import React, {useEffect} from 'react';
import { UseTitleContext } from '../../Context/TitleContextProvider';
import './css/Create.css'

const Create = () => {
    const {changeTitle} = UseTitleContext();
    
    useEffect(() => {
        changeTitle('Create New Article');
    }, [changeTitle])
    return (
        <div className="create">
            <Head />
            <Body />
        </div>
    );
}

export default Create;