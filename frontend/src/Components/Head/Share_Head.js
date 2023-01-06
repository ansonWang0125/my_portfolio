import React from 'react';
import './css/Head.css';
import {UseTitleContext} from '../../Context/TitleContextProvider'

const ShareHead = () => {
  const {title} = UseTitleContext();

  return (
    <div className="share-head">
      <div  className = 'header1'>

          <div className ='start'>
            <span> {title}</span>
          </div>
      </div>
    </div>
  );
  }

export default ShareHead;