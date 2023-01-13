import React from 'react';
import './css/Head.css';
import {UseTitleContext} from '../../Context/TitleContextProvider'

const ShareHead = () => {
  const {title} = UseTitleContext();

  return (
    <div className="share-header">

          <div className ='start'>
            <span> {title}</span>
          </div>
    </div>
  );
  }

export default ShareHead;