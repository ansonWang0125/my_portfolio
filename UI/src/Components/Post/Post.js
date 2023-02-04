import MyEditor from '../EditComponent/Editor';
import ToolBar from '../EditComponent/ToolBar';
import SaveButton from '../EditComponent/SaveButton';
import React, { useState, useEffect } from 'react';
import { EditorState, convertFromRaw } from 'draft-js'
import DataPicker from '../DatePicker/DatePicker';
import { useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
import './Post.css'
import { apiArticlePost } from '../../axios/api';

const  Post = () =>{

    const location = useLocation()
    const href = window.location.href
    const id = href.substring(href.lastIndexOf('/')+1).split("=")[1]

    const[editorStateTitle, setEditorStateTitle] = useState(EditorState.createEmpty())
    const[editorStateContent, setEditorStateContent] = useState(EditorState.createEmpty())
    const[editorStateAuthor, setEditorStateAuthor] = useState(EditorState.createEmpty())
    const [time, setTime] = useState(dayjs());
    const readOnly = (location.state !== null ? location.state.readOnly : true);
    const articleID = (location.state !== null ? location.state.id : id)

    async function postArticles (credentials)  {
        return apiArticlePost(credentials)
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
    useEffect( ()=>{
        const fetchData = async () => {
            console.log('post id',articleID)
            const response = await postArticles({id:articleID});
            // const authorTag = 'Auhtor: ';
            // response.articlesInform.authorState.blocks[0].text = authorTag.concat(response.articlesInform.authorState.blocks[0].text)
            const initialStateTitle = EditorState.createWithContent(convertFromRaw(response.articlesInform.titleState))
            setEditorStateTitle(initialStateTitle)
            const initialStateContent = EditorState.createWithContent(convertFromRaw(response.articlesInform.content))
            setEditorStateContent(initialStateContent)
            const initialStateAuthor = EditorState.createWithContent(convertFromRaw(response.articlesInform.authorState))
            setEditorStateAuthor(initialStateAuthor)
            setTime(dayjs(response.articlesInform.time))
        }
        fetchData()
    },[articleID])

    const titlePlaceholder = 'Title'

    const contentPlaceholder='Content...'

    const authorPlaceholder='author name'


    return (
        <div className="container">
            <div className='post'>
                <ToolBar />
                <div className='title'>
                    <MyEditor placeholder={titlePlaceholder} editorState={editorStateTitle} setEditorState={setEditorStateTitle} readOnly={readOnly} allowAdd={false}/>
                </div>
                <div className='editInform'>
                    <span className='author'>
                        <span id='authorSpan'>Author: </span>
                        <MyEditor placeholder={authorPlaceholder} editorState={editorStateAuthor} setEditorState={setEditorStateAuthor} readOnly={readOnly} allowAdd={false}/>
                    </span>
                    <span className='time'>
                        {readOnly ? <div className='datestring'>Edit Time: {time.format('DD/MM/YYYY') }</div> : <DataPicker setTime={setTime} time={time}/> }
                    </span>
                </div>
                <div className='content'>
                    <MyEditor placeholder={contentPlaceholder} editorState={editorStateContent} setEditorState={setEditorStateContent} readOnly={readOnly} allowAdd={true}/>
                </div>
            </div>
            <div >
                {readOnly ? <></>:<SaveButton id={articleID} editorStateTitle={editorStateTitle} editorStateAuthor={editorStateAuthor} time={time} editorStateContent={editorStateContent}/>}
            </div>
        </div>
    );
    } 

export default Post;