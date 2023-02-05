import React, {useEffect} from 'react';
import { UseTitleContext } from '../../Context/TitleContextProvider';
import Post from '../../Components/Post/Post'
import SearchPage from "./SearchPage/SearchPage"
import { Route, Routes } from "react-router-dom";
import './Portfolios.css'


const Portfolios = () => {
    const {changeTitle} = UseTitleContext();
    useEffect(() => {
        changeTitle('Portfolios');
    }, [changeTitle])
    return (
        <div className="Portfolios">
            <Routes>
                <Route path="/" element={<SearchPage/>} />
                <Route path="/:id" element={<Post /> } />
            </Routes>
        </div>
    );
}

export default Portfolios;