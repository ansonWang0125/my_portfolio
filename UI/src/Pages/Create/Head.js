import React from 'react';
import {UseTitleContext} from '../../Context/TitleContextProvider'

const  Head = () =>{
    const {title} = UseTitleContext();
    return (
        <div className='Head'>
            <div className ='start'>
            <span> {title}</span>
          </div>
        </div>
    );
    } 

export default Head;