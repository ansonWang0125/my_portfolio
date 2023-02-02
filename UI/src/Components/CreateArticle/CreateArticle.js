import React, { useState, useRef, useEffect } from 'react';
import dayjs from 'dayjs';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import './createArticle.css'
import { apiArticleCreate } from '../../axios/api';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { EditorState, ContentState, convertToRaw, convertFromRaw } from 'draft-js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";


const CreateArticle = () =>{
    const [valid, setValid] = useState(false)
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState(EditorState.createEmpty());
    const [author, setAuthor] = useState(EditorState.createEmpty());
    const [content, setContent] = useState(convertToRaw(ContentState.createFromText('New Content')));
    const [success, setSuccess] = useState();
    const [hascreate, setHasCreate] = useState(false);
    const [incorrect, setIncorrect] = useState(false);
    const [click, setClick] = useState();
    const formRef = useRef()
    const time = dayjs()
    const navigate = useNavigate();

    useEffect ( () => {
        if (success) {
            toast.success('建立成功 ! ', {
                position:toast.POSITION.TOP_CENTER,
                className: 'toast-success'
            })}
        if (hascreate) {
            toast.info('標題已存在 ! ', {
                position:toast.POSITION.TOP_CENTER,
                className: 'toast-info'
            })}
        if (incorrect) {
            toast.error('資料有誤 ! ', {
                position:toast.POSITION.TOP_CENTER,
                className: 'toast-error'
            })}
    }, [success, hascreate, incorrect, click])

    async function createArticle(credentials) {
        return apiArticleCreate(credentials)
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (valid){
            console.log('success')
            console.log('Author: ', author)
            const response = await createArticle({
                category,
                title,
                author,
                time,
                content
            });

            console.log(response);
            if (response.success) {
                setHasCreate(false)
                setIncorrect(false)
                setSuccess(true)
                console.log('create id',response.articleInform.id)
                navigate(`/${category}_Articles/${title.blocks[0].text}`,{state : {id:response.articleInform.id, readOnly:false}})
            }else if ( !response.success){
                if ( response.message === "Something went wrong") {
                    setSuccess(false)
                    setHasCreate(false)
                    setIncorrect(true)
                } else if (response.message === 'Article already exists') {
                    setSuccess(false)
                    setIncorrect(false)
                    setHasCreate(true)
                }
            }
            setClick(!click)
        }

    };
    const handleChangeContentState = (input, setValue) => {
        const contentState = convertToRaw(ContentState.createFromText(input))
        setValue(contentState)
    }
    const handleBtnClick = () => {
        formRef.current.reportValidity();
        setValid( convertFromRaw(title).hasText() && convertFromRaw(author).hasText())
    }
    return (
        <div className='CreateField' >
           <Box
                ref={formRef}
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                className='box'
                onSubmit={handleSubmit}
            >
            <Paper elevation={3} className='paper'>
                <div className='input'>
                <div className='inputitem'>
                    <span className="inline">Category: </span>
                    <Select
                        labelId="select-required-label"
                        id="select-required"
                        value={category}
                        onChange={e=>{setCategory(e.target.value)}}
                        style={{width: '215.63px',height:'40px', margin:'3%'}}
                        required
                        defaultValue={""}
                        >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={'Website'}>Website</MenuItem>
                        <MenuItem value={'Work'}>Work</MenuItem>
                        <MenuItem value={'Other'}>Other</MenuItem>
                    </Select>
                </div>
                <div className="inputitem">
                    <span className="inputinline">Title: </span>
                    <TextField
                        required
                        id="outlined-required"
                        size='small'
                        onInput={e=>handleChangeContentState(e.target.value, setTitle)}
                    />
                </div>
                <div className="inputitem">
                    <span className="inline" >Author: </span>
                    <TextField
                        required
                        id="outlined-required"
                        size='small'
                        onChange={e=>handleChangeContentState(e.target.value, setAuthor)}
                    />
                </div>
                <br/>
                <div className="contentInput">
                    <span className="inline">Some Description: </span>
                    <TextField
                        required
                        id="content-required"
                        size='small'
                        defaultValue='New Content'
                        multiline
                        style={{width: '100%', marginLeft:'0%'}}
                        rows={6}
                        onChange={e=>handleChangeContentState(e.target.value, setContent)}
                    />
                </div>
                <div className='createbutton'>
                    <Button type="submit" size='small' variant='outlined' color='primary' onClick={handleBtnClick}>Create Article</Button>
                    </div>
                </div>
            </Paper>
            </Box>
        </div>
    );
    } 

export default CreateArticle;