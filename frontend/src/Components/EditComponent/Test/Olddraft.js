import React, { useState, useRef } from 'react';
import PluginEditor, {composeDecorators, createEditorStateWithText} from 'draft-js-plugins-editor'
import { Editor, EditorState, convertToRaw, convertFromRaw, ContentState, RichUtils, CompositeDecorator} from 'draft-js';
import { makeStyles, ThemeProvider } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import TextField from '@mui/material/TextField';
import CodeIcon from '@mui/icons-material/Code';
import LinkIcon from '@mui/icons-material/Link';
import AddImage from '../AddImage'
import useStyleMap from '../../styleMap/useStyleMap';
import { createTheme} from '@mui/material/styles';
import createImagePlugin from  'draft-js-image-plugin';
import createInlineToolbarPlugin from "draft-js-inline-toolbar-plugin";
import createLinkPlugin from "draft-js-anchor-plugin";
import createResizeablePlugin from 'draft-js-resizeable-plugin';
import createFocusPlugin from 'draft-js-focus-plugin';
import { stateToHTML } from "draft-js-export-html";

let themeStyles = {
    input: "input-here",
    inputInvalid: "PUT YOUR INPUT INVALID CLASS HERE"
};

const linkPlugin = createLinkPlugin({
  theme: themeStyles,
  placeholder: "http://…"
});
const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;

const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin()
const decorator= composeDecorators(resizeablePlugin.decorator, focusPlugin.decorator)
const imagePlugin = createImagePlugin(decorator);
const plugins = [resizeablePlugin,imagePlugin, focusPlugin,inlineToolbarPlugin, linkPlugin]

const theme = createTheme();

const useStyles = makeStyles({
    draftEditorContainer: {
        '& .public-DraftEditorPlaceholder-root': {
            color: 'rgb(145, 151, 163)',
            position: 'absolute',
            userSelect:'none'
        },
        '& .public-DraftEditor-content': {
            minHeight: 450,
        },
        '& ul': {
            paddingLeft: 20,
        }
    },
    textarea: {
        width:'100%'
    },
    textField: {
        paddingLeft: theme.spacing(),
        paddingRight: theme.spacing(),
        "& .MuiInputBase-root":{
            height:40
        },
        '& .MuiSelect-root' :{
            '& option': {
                color: 'rgba(0,0,0,0.87)',
            },
        },
        '& .MuiInput-underline:before':{
            boder:'none',
        },
    },
})

const text =
  "Try selecting a part of this text and click on the link button in the toolbar that appears …";

// const htmlContentFromServer =
//             '<b>Bold text</b>, <i>Italic text</i><br/ ><br />' +
//             '<a href="https://www.facebook.com">Example link</a><br /><br/ >' +
//             '<img src="https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGhvdG98ZW58MHx8MHx8&w=1000&q=80" height="112" width="200" />';


export default function Draft() {
    const classes = useStyles();
    const ref = useRef()

    const { fontFamilyStyleMap, fontSizeStyleMap, customStyleMap } = useStyleMap();

    const [editorState, setEditorState] = useState(EditorState.createWithContent(ContentState.createFromText('Hello')));
    const[editorState2, setEditorState2] = useState(createEditorStateWithText(text))

    const [fontFamilySelected, setFontFamilySelected] = useState('');
    const [fontSizeSelected, setFontSizeSelected] = useState('');

    const handleChangeEditorState = (internalEditorState) => {
        console.log(internalEditorState)
        Object.keys(fontFamilyStyleMap).forEach(key => {
            if (internalEditorState.getCurrentInlineStyle().has(key)){
                setFontFamilySelected(key);
            }
        });
        Object.keys(fontSizeStyleMap).forEach(key => {
            if (internalEditorState.getCurrentInlineStyle().has(key)){
                setFontSizeSelected(key);
            }
        });
        setEditorState(internalEditorState);
    }

    // const handleChangeTextArea = (event) => {
    //     setEditorState(EditorState.createWithContent(
    //         convertFromRaw(JSON.parse(event.target.value)), //json.parse 將JSON(JavaScript Object Notation)(物件標記法)表示的字串轉換成物件
    //     ))
    // }

    const handleToggleInlineStyleClick = (inlineStyle) => {
        handleChangeEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
    }
    const handleToggleFontFamilyInlineStyleClick = (inlineStyle) => {
        Object.keys(fontFamilyStyleMap).forEach((key) => {
            if (editorState.getCurrentInlineStyle().has(key)){
                handleChangeEditorState(RichUtils.toggleInlineStyle(editorState,key));
            }
        });
        if (!editorState.getCurrentInlineStyle().has(inlineStyle)){
            handleChangeEditorState(RichUtils.toggleInlineStyle(editorState,inlineStyle));
        }
    }

    const handleToggleFontSizeInlineStyleClick = (inlineStyle) => {
        Object.keys(fontSizeStyleMap).forEach((key) => {
            if (editorState.getCurrentInlineStyle().has(key)){
                handleChangeEditorState(RichUtils.toggleInlineStyle(editorState,key));
            }
        });
        if (!editorState.getCurrentInlineStyle().has(inlineStyle)){
            handleChangeEditorState(RichUtils.toggleInlineStyle(editorState,inlineStyle));
        }
    }

    const handleChangeFontFamilySelected = (event) => {
        setFontFamilySelected(event.target.value);
        handleToggleFontFamilyInlineStyleClick(event.target.value);
    }

    const handleChangeFontSizeSelected = (event) => {
        setFontSizeSelected(event.target.value);
        handleToggleFontSizeInlineStyleClick(event.target.value);
    }

    const onChange = (editorState) => {
        let options = {
            entityStyleFn: (entity)=> {
                const entityType = entity.get("type").toLowerCase();
                if (entityType === "image"){
                    const data = entity.getData();
                    return {
                        element: "img",
                        attributes: {
                            src: data.src
                        },
                        style: {
                            // width: '100px'
                        }
                    };
                }
            }
        }
        
        const valueToSend = stateToHTML(editorState.getCurrentContent(), options);
        console.log("what is that",valueToSend);
        // see this url for image example https://github.com/sstur/draft-js-utils/pull/85/files

        setEditorState(editorState)
    }

    const toolBarChange = (editorState) => {
        setEditorState2(editorState)
    }

    const focus = () => {
        ref.current.focus();
    }

    return (
        // <Grid container>
        //     <Grid item xs={12}>
        <div >
            <div className={classes.draftEditorContainer}>
                <Editor 
                    editorState={editorState}
                    onChange={handleChangeEditorState}
                    placeholder="請在此輸入內容"
                    customStyleMap={customStyleMap}
                />
                <PluginEditor 
                    editorState={editorState2}
                    onChange={toolBarChange}
                    plugins={plugins}
                    placeholder="請在此輸入內容"
                    customStyleMap={customStyleMap}
                />
            </div>
            <InlineToolbar>
            {
            externalProps => (
                <div>
                <ThemeProvider theme={theme}>
                <TextField
                    select
                    className={classes.textField}
                    value={fontFamilySelected}
                    onChange={handleChangeFontFamilySelected}
                    SelectProps={{
                        native:true
                    }}
                >
                    <option value="">預設字型</option>
                    {Object.keys(fontFamilyStyleMap).map((key) => (
                        <option key={key} value={key}>
                            {key}
                        </option>
                    ))}
                </TextField>
                <TextField
                    select
                    className={classes.textField}
                    value={fontSizeSelected}
                    onChange={handleChangeFontSizeSelected}
                    SelectProps={{
                        native:true
                    }}
                >
                    <option value="">預設大小</option>
                    {Object.keys(fontSizeStyleMap).map((key) => (
                        <option key={key} value={key}>
                            {key}
                        </option>
                    ))}
                </TextField>
                </ThemeProvider>
                <IconButton color='inherit' onClick={() => handleToggleInlineStyleClick('BOLD')}>
                    <FormatBoldIcon />
                </IconButton>
                <IconButton color='inherit' onClick={() => handleToggleInlineStyleClick('ITALIC')}>
                    <FormatItalicIcon />
                </IconButton>
                <IconButton color='inherit' onClick={() => handleToggleInlineStyleClick('UNDERLINE')}>
                    <FormatUnderlinedIcon />
                </IconButton>
                <IconButton color='inherit' onClick={() => handleToggleInlineStyleClick('CODE')}>
                    <CodeIcon />
                </IconButton>
                <linkPlugin.LinkButton {...externalProps} />
                <AddImage editorState={editorState} onChange={onChange} modifier={imagePlugin.addImage}/>
                </div>
                )}
            </InlineToolbar>
            </div>
            // <Grid item xs={6}className={classes.draftEditorContainer}>
            //     <Paper onClick={focusEditor}>
        //         </Paper>
        //     </Grid>
        //     <Grid item xs={6}>
        //         <textarea
        //             rows={30}
        //             className={classes.textarea}
        //             value={JSON.stringify(convertToRaw(editorState.getCurrentContent()), null, 2)} // 將任何物件轉換成JSON
        //             onChange={handleChangeTextArea}
        //         />
        //     </Grid>

        // </ Grid>
    )
}

// transform: translate(-50%) scale(0); visibility: hidden; top: 92px; left: 323.648px;
// transform: translate(-50%) scale(0); visibility: hidden; top: 89px; left: 298.562px;