import React, {useEffect} from 'react';
import { UseTitleContext } from '../../Context/TitleContextProvider';
import Post from '../../Components/Post/Post'
import SearchPage from "./SearchPage/SearchPage"
import { Route, Routes } from "react-router-dom";
import './Work.css'


const Work = () => {
    const {changeTitle} = UseTitleContext();
    useEffect(() => {
        changeTitle('Work');
    }, [changeTitle])
    return (
        <div className="Work">
            <Routes>
                <Route path="/" element={<SearchPage/>} />
                <Route path="/:id" element={<Post /> } />
            </Routes>
        </div>
    );
}

export default Work;