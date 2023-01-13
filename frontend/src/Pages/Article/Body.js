import ToolBarEditor from '../../Components/EditComponent/ToolBarEditor';
import React, { useState  } from 'react';
import { EditorState, ContentState } from 'draft-js'

const  Head = () =>{

    const title='Article Title'
    const titlePlaceholder = 'Title'
    const initialStateTitle = EditorState.createWithContent(ContentState.createFromText(title))
    const[editorStateTitle, setEditorStateTitle] = useState(initialStateTitle)

    const content='Context Description'
    const contentPlaceholder='Content...'
    const initialStateContent = EditorState.createWithContent(ContentState.createFromText(content))
    const[editorStateContent, setEditorStateContent] = useState(initialStateContent)

    const authorTag = 'Author: '
    const author=authorTag.concat('Anson Wang')
    const authorPlaceholder='author name'
    const initialStateAuthor = EditorState.createWithContent(ContentState.createFromText(author))
    const[editorStateAuthor, setEditorStateAuthor] = useState(initialStateAuthor)

    const timeTag = 'Edit Time: '
    const time=timeTag.concat('2023/1/12')
    const timePlaceholder='edit time'
    const initialStateTime = EditorState.createWithContent(ContentState.createFromText(time))
    const[editorStateTime, setEditorStateTime] = useState(initialStateTime)

    return (
        <div className='Body'>
            <div className='title'>
                <ToolBarEditor text={title} placeholder={titlePlaceholder} editorState={editorStateTitle} setEditorState={setEditorStateTitle}/>
            </div>
            <div className='editInform'>
                <span className='author'>
                    <ToolBarEditor text={author} placeholder={authorPlaceholder} editorState={editorStateAuthor} setEditorState={setEditorStateAuthor}/>
                </span>
                <span className='time'>
                    <ToolBarEditor text={time} placeholder={timePlaceholder} editorState={editorStateTime} setEditorState={setEditorStateTime}/>
                </span>
            </div>
            <div className='content'>
                <ToolBarEditor text={content} placeholder={contentPlaceholder} editorState={editorStateContent} setEditorState={setEditorStateContent}/>
            </div>
        </div>
    );
    } 

export default Head;