import React from 'react';
import Head from './Head';
import { UseTitleContext } from '../../Context/TitleContextProvider';

const Article = () => {
    const {changeTitle} = UseTitleContext();
    changeTitle('Website Article');
    return (
        <div className="article">
            <Head />
        </div>
    );
}

export default Article;