import LinkIcon from '@mui/icons-material/Link';
import React, { useState, useEffect} from 'react';
import IconButton from '@mui/material/IconButton';
import './css/draft.css';

export default function AddLink() {
    

    const handleLinkClick = () => {

    }

    return (
        <IconButton color='inherit' onClick={() => handleLinkClick()}>
                <LinkIcon />
        </IconButton>
    )
}