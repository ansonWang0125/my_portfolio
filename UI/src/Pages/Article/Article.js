import React, {useEffect} from 'react';
import { UseTitleContext } from '../../Context/TitleContextProvider';
import { Route, Routes } from "react-router-dom";
import Post from '../../Components/Post/Post'
import SearchPage from "./SearchPage/SearchPage"
import './article.css'

const Article = () => {
    const {changeTitle} = UseTitleContext();
    useEffect(() => {
        changeTitle('Website Article');
    }, [changeTitle])
    return (
        <div className="article">
            <Routes>
                <Route path="/" element={<SearchPage/>} />
                <Route path="/i*" element={<Post /> } />
            </Routes>
        </div>
    );
}

export default Article;