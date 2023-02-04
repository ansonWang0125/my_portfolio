import React, { useState, useEffect} from 'react';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import './css/draft.css';
import { AtomicBlockUtils, EditorState } from "draft-js";
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import List from '@mui/material/List';


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
        console.log('url: ',URL.createObjectURL(event.target.files[0]))
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
                    <input type='file' hidden accept="image/*"  multiple onChange={handleChange}/>
                    <MenuItem className="listItemButton">
                        <ListItemIcon>
                            <AddPhotoAlternateIcon />
                        </ListItemIcon>
                        <ListItemText>Add image</ListItemText>
                    </MenuItem>
                </label>
            </IconButton>
        </List>
    )
}