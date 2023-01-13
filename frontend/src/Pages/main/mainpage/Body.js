import {React} from 'react';
import { NavLink } from 'react-router-dom';

const Body = ({data}) => {


    return (
        <div className="body">
            <div className="illustration">
                <p>This is my main page</p>
            </div>
            <div className="BlogLink">
                <NavLink to="/blog" className="item">
                    To My Blog
                </NavLink>
            </div>
        </div>
    )
}

export default Body