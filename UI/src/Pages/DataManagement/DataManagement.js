import Head from './Head';
import Body from './Body';
import React, {useEffect} from 'react';
import { UseTitleContext } from '../../Context/TitleContextProvider';
import './css/DataManagement.css'

const DataManagement = () => {
    const {changeTitle} = UseTitleContext();
    
    useEffect(() => {
        changeTitle('Data Management');
    }, [changeTitle])
    return (
        <div className="dataManagement">
            <Head />
            <Body />
        </div>
    );
}

export default DataManagement;