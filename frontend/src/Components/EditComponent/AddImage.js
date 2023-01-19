import React, { useState, useEffect} from 'react';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import ListItemButton from '@mui/joy/ListItemButton';
import IconButton from '@mui/material/IconButton';
import './css/draft.css';
import { AtomicBlockUtils, EditorState } from "draft-js";
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import List from '@mui/joy/List';


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
        <List
            component="nav"
            sx={{
                maxWidth: 320,
            }}
        >
            <IconButton 
                sx={{
                    ml: 1,
                    "&.MuiButtonBase-root:hover": {
                    bgcolor: "transparent"
                    }
                }}
            >
                <label>
                    <input type='file'  multiple onChange={handleChange}/>
                    <ListItemButton className="listItemButton">
                        <ListItemDecorator>
                            <AddPhotoAlternateIcon />
                        </ListItemDecorator>
                        Add image
                    </ListItemButton>
                </label>
            </IconButton>
        </List>
    )
}