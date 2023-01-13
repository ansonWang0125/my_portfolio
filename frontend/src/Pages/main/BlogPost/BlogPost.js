import {React} from 'react';
import Chip from '../../../Components/Chip/Chip';
import EmptyList from '../../../Components/EmptyList/EmptyList';
import { Link } from 'react-router-dom'
import './css/BlogPost.css';

const Blog = ({content}) => {
    return (
        <>
            <Link className='blog-goBack' to='/blog'>
                <span> &#8592;</span> <span>Go Back</span>
            </Link>
            {console.log('blogpost', content)}
            {content ? (
                <div className='blog-wrap'>
                <header>
                    <p className='blog-date'>Published {content.created}</p>
                    <h1>{content.title}</h1>
                    <div className='blog-subCategory'>
                    
                        <div>
                        <Chip label={content.tags[0].name} />
                        </div>
                    
                    </div>
                </header>
                <img src={content.featured_image} alt='cover' />
                <div className='blog-content' dangerouslySetInnerHTML={{__html: content.body}}></div>
                </div>
            ) : (
                <EmptyList />
            )}

        </>
    )
}

export default Blog;