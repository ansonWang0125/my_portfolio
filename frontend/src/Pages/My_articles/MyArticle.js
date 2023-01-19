import React, {useEffect} from 'react';
import Head from './Head';
import { UseTitleContext } from '../../Context/TitleContextProvider';

const MyArticles = () => {
    const {changeTitle} = UseTitleContext();
    useEffect(() => {
        changeTitle('My Articles');
    }, [changeTitle])
    return (
        <div className="MyArticles">
            <Head />
        </div>
    );
}

export default MyArticles;