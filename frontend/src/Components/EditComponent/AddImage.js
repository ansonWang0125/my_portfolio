import React, { useState, useEffect} from 'react';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import IconButton from '@mui/material/IconButton';
import './css/draft.css';
import { AtomicBlockUtils, EditorState } from "draft-js";

export default function AddImage({editorState,onChange, setClicked}) {
    const [file, setFile] = useState();
    useEffect(() => {
        const insertImage = (editorState, url) => {
            const contentState = editorState.getCurrentContent();
            const contentStateWithEntity = contentState.createEntity(
                "image",
                "IMMUTABLE",
                {src: url}
            )
            const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
            const newEditorState = EditorState.set(editorState, {
                currentContent: contentStateWithEntity
            });
            return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " ");
        }
        if (file !== undefined) {
            let newEditorState = editorState
            newEditorState = insertImage(newEditorState, file)
            onChange(newEditorState)
            setClicked(false)
        }
    }, [file, editorState, onChange, setClicked])
    const handleChange = (event) => {
        setFile(URL.createObjectURL(event.target.files[0]))
    }
    return (
        <IconButton color='inherit' >
            <label>
                <input type='file'  multiple onChange={handleChange}/>
                <AddPhotoAlternateIcon />
            </label>
        </IconButton>
    )
}