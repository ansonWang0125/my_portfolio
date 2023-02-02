import SaveAltIcon from '@mui/icons-material/SaveAlt';
import IconButton from '@mui/material/IconButton';
import { convertToRaw } from 'draft-js';
import React from 'react';
import { apiArticleSave } from '../../axios/api';

export default function SaveButton ({id, editorStateTitle, editorStateAuthor, time, editorStateContent}) {
    async function saveArticle(credentials) {
        return apiArticleSave(credentials)
         .then(response=> {
            if (response.status === 201) {
                return response.data
            }
            if (!response.ok) {throw new Error(response.status)}
         })
         .catch((error) => {
            console.log('error: ' + error);
         })
    }
    
    const handleSave = async e  => {
        e.preventDefault();
        const title = convertToRaw(editorStateTitle.getCurrentContent())
        const author = convertToRaw(editorStateAuthor.getCurrentContent())
        const content = convertToRaw(editorStateContent.getCurrentContent())
        const response = await saveArticle({
            id,
            title,
            author,
            time,
            content
        });
        console.log(response);
    }
    return (
        <div className='savebutton'>
            <IconButton onClick={handleSave}>
            <SaveAltIcon color="disabled"/>
            </IconButton>
        </div>
    )
}