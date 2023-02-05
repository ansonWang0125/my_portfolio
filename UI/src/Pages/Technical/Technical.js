import React, {useEffect} from 'react';
import { UseTitleContext } from '../../Context/TitleContextProvider';
import Post from '../../Components/Post/Post'
import SearchPage from "./SearchPage/SearchPage"
import { Route, Routes } from "react-router-dom";
import './Technical.css'

const Technical = () => {
    const {changeTitle} = UseTitleContext();
    useEffect(() => {
        changeTitle('Technical Articles');
    }, [changeTitle])
    return (
        <div className="Technical">
            <Routes>
                <Route path="/" element={<SearchPage/>} />
                <Route path="/:id" element={<Post /> } />
            </Routes>
        </div>
    );
}

export default Technical;