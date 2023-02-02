import React, {useEffect} from 'react';
import { UseTitleContext } from '../../Context/TitleContextProvider';
import './css/Profile.css'
import Post from '../../Components/Post/Post'
import SearchPage from "./SearchPage/SearchPage"
import { Route, Routes } from "react-router-dom";

export default function Profile () {
    const {changeTitle} = UseTitleContext();
    
    useEffect(() => {
        changeTitle('Profile');
    }, [changeTitle])
    return (
        <div className="profile">
            <Routes>
                <Route path="/" element={<SearchPage/>} />
                <Route path="/:id" element={<Post /> } />
            </Routes>
        </div>
    )
}