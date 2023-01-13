import React from 'react';
import './css/Empty.css';
import noresult from '../../assets/noresult.webp'

const EmptyList = () => (
    <div className='emptyList-wrap'>
        <img src={noresult} alt='empty'/>
    </div>
)
export default EmptyList