import React, {useEffect} from 'react';
import { UseTitleContext } from '../../Context/TitleContextProvider';
import Post from '../../Components/Post/Post'
import SearchPage from "./SearchPage/SearchPage"
import { Route, Routes } from "react-router-dom";
import './other.css'

const Others = () => {
    const {changeTitle} = UseTitleContext();
    useEffect(() => {
        changeTitle('Others Articles');
    }, [changeTitle])
    return (
        <div className="Others">
            <Routes>
                <Route path="/" element={<SearchPage/>} />
                <Route path="/:id" element={<Post /> } />
            </Routes>
        </div>
    );
}

export default Others;