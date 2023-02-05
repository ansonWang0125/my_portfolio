import React, { useState, useEffect} from 'react';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import './css/draft.css';
import { AtomicBlockUtils, EditorState } from "draft-js";
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import List from '@mui/material/List';
import { apiUploadImage, apiGetImage } from '../../axios/api';
import { Buffer } from 'buffer';


export default function AddImage({editorState,onChange, setClicked, articleID}) {
    const [srcValue, setSrcValue] = useState();
    const [image, setImage] = useState({ data: ''})
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
        if (srcValue !== undefined) {
            let newEditorState = editorState
            newEditorState = insertImage(newEditorState, srcValue)
            onChange(newEditorState)
            setClicked(false)
        }
    }, [srcValue, editorState, onChange, setClicked])

    async function uploadImage (credentials)  {
        return apiUploadImage(credentials)
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

    async function getImage (credentials)  {
        return apiGetImage(credentials)
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

    useEffect(()=>{
        const upload = async () => {
            let formData = new FormData()
            formData.append('file', image.data)
            formData.append('articleID', articleID)
            const response = await uploadImage(formData)
            console.log('image',response)
            if ( !response.success ) {
                console.log(response.message)
            }
            if (response.id !== -1){
                // console.log(response.id)
                const getResponse = await getImage(response.id)
                if (getResponse.success) {
                    // console.log('data = ', getResponse.image)
                    let ImageBase64 = Buffer.from(getResponse.image, 'binary').toString('base64')
                    setSrcValue("data:image/png;base64,"+ImageBase64)
                } else{
                    console.log(getResponse.message)
                }
            }
        }
        upload()
    },[image, articleID])

    const handleChange = (event) => {
        // console.log('url: ',URL.createObjectURL(event.target.files[0]))
        // setFile(URL.createObjectURL(event.target.files[0]))
        const img = {
            data: event.target.files[0],
        }
        setImage(img)
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