import React from 'react';
import BlogItem from '../BlogItem/BlogItem';
import './css/BlogList.css';

const BlogList = ({ blogs, content}) => {
    return (
        <div className='blogList-wrap'>
            {blogs.map((blog, index) => (
                <BlogItem blog={blog} content={content} key={index}/>
            ))}
        </div>
    )
}

export default BlogList;