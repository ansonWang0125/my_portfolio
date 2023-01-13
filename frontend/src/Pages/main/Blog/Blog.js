import Head from './Head';
import Body from './Body';
import React from 'react';

const Blog = ({data}) => {
    return (
        <div className="main">
            <Head />
            <Body data={data}/>
        </div>
    );
}

export default Blog;