import React, {useEffect} from 'react';
import Head from './Head';
import Body from './Body';
import { UseTitleContext } from '../../Context/TitleContextProvider';
import './article.css'

const Article = () => {
    const {changeTitle} = UseTitleContext();
    useEffect(() => {
        changeTitle('Website Article');
    }, [changeTitle])
    return (
        <div className="article">
            <Head />
            <Body />
        </div>
    );
}

export default Article;