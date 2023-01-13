import {React, useState, useEffect } from 'react';
import EmptyList from '../../../Components/EmptyList/EmptyList';
import BlogList from '../../../Components/BlogList/BlogList';
import SearchBar from '../../../Components/SearchBar/SearchBar';
import { apiBlogList } from '../../../axios/api'

const Body = ({data}) => {
    const [blogs, setBlogs] = useState([]);
    const [searchKey, setSearchKey] = useState('');

    useEffect(() => {
        apiBlogList().then((res) => {
            setBlogs(res);
        })
    } , []);

    //search submit
    const handleSearchBar = (e) => {
        e.preventDefault();
        handleSearchResults();
    }

    const handleSearchResults = () => {
        //handle search inputs
        const filtered = blogs.filter((blog) => {
            return blog.tags[0].name.toLowerCase().includes(searchKey.toLowerCase());
          });
          setBlogs(filtered);
    }

    const handleClearSearch = () => {
        apiBlogList().then((res) => {
            setBlogs(res)
        })
        setSearchKey("")
    }
    const BlogContent = (id) => {
        console.log(data)
        data(id);
    }

    return (
        <div className="body">
            <SearchBar
                value={searchKey}
                clearSearch={handleClearSearch}
                formSubmit={handleSearchBar}
                handleSearchKey={(e) => setSearchKey(e.target.value)}
            />
            {!blogs.length? <EmptyList/> :<BlogList blogs={blogs} content={BlogContent}/>}
        </div>
    )
}

export default Body