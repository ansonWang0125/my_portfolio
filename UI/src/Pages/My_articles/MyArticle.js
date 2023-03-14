import React, {useEffect} from 'react';
import { UseTitleContext } from '../../Context/TitleContextProvider';
import Post from '../../Components/Post/Post'
import SearchPage from "./SearchPage/SearchPage"
import { Route, Routes } from "react-router-dom";
import './MyArticle.css'

const MyArticles = () => {
    const {changeTitle} = UseTitleContext();
    useEffect(() => {
        changeTitle('My Articles');
    }, [changeTitle])
    return (
        <div className="MyArticles">
            <Routes>
                <Route path="/" element={<SearchPage/>} />
                <Route path="/i*" element={<Post /> } />
            </Routes>
        </div>
    );
}

export default MyArticles;