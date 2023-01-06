import React, {useEffect} from 'react';
import Head from './Head';
import { UseTitleContext } from '../../Context/TitleContextProvider';

const Article = () => {
    const {changeTitle} = UseTitleContext();
    useEffect(() => {
        changeTitle('Website Article');
    }, [changeTitle])
    return (
        <div className="article">
            <Head />
        </div>
    );
}

export default Article;