import "draft-js-inline-toolbar-plugin/lib/plugin.css";
import { ItalicButton, BoldButton, UnderlineButton, } from "draft-js-buttons";
import createInlineToolbarPlugin from "draft-js-inline-toolbar-plugin";
import createLinkPlugin from "draft-js-anchor-plugin";
import Editor, { composeDecorators } from "draft-js-plugins-editor";
// import RightClick from './RightClick'
import { ContextMenu } from "./css/styles";
import React, { useState, useEffect, useRef } from "react";
import createImagePlugin from  'draft-js-image-plugin';
import createResizeablePlugin from 'draft-js-resizeable-plugin';
import useStyleMap from '../styleMap/useStyleMap';
import editorStyles from './editorStyles.module.css';
import { makeStyles }from '@material-ui/core/styles';
import AddImage from './AddImage'
import { stateToHTML } from "draft-js-export-html";

import FontStyle from "./FontStyle";

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
  const resizeablePlugin = createResizeablePlugin()
  const decorator= composeDecorators(resizeablePlugin)
  const imagePlugin = createImagePlugin(decorator);
  const plugins = [resizeablePlugin,inlineToolbarPlugin, linkPlugin, imagePlugin]

  const FontStyleHandler = (props) => {
    const handleMouseDown = (e) =>e.preventDefault();
    const onClick = () => {props.onOverrideContent(FontStyle); console.log('comeback')}
    return (
      <div onMouseDown={handleMouseDown} className={editorStyles.headlineButtonWrapper}>
        <button onClick={onClick} className={editorStyles.headlineButton}>FontStyle</button>
      </div>
    )
  }

  const useStyles = makeStyles((theme)=>({
    draftEditorContainer: {
      '& .public-DraftEditorPlaceholder-root': {
        color: 'rgb(145, 151, 163)',
        position: 'absolute',
        userSelect:'none',
    },
    },}))
  
  export default function ToolBarEditor ({editorState, setEditorState, placeholder}) {

    const classes = useStyles()

    const editorRef = useRef()

    const rightRef= useRef()

    const [clicked, setClicked] = useState(false);
    const [points, setPoints] = useState({
      x: 0,
      y: 0,
    });
    useEffect(() => {
      const handleClick = (event) => {
        if (clicked){
          if (!rightRef.current.contains(event.target)){
            setClicked(false);
          }}
      }
      window.addEventListener("click", handleClick);
      return () => {
        window.removeEventListener("click", handleClick);
      };
    }, [clicked]);

    const {customStyleMap } = useStyleMap();

  
    const onChange = editorState => setEditorState( editorState );

    const imageOnChange = (editorState) => {
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
      console.log(valueToSend);
      // see this url for image example https://github.com/sstur/draft-js-utils/pull/85/files

      setEditorState(editorState)
  }

  const handleClick = () =>{
    editorRef.current.focus()
  }
  
    return (
      <>
      <div
        className={classes.draftEditorContainer}
        onClick={handleClick}
        onContextMenu={(e) => {
          e.preventDefault();
          setClicked(true);
          setPoints({
            x: e.pageX,
            y: e.pageY,
          });
          console.log("Right Click", e.pageX, e.pageY);
        }}
      >
            <Editor
              style={{float:'none'}}
              editorState={editorState}
              onChange={onChange}
              plugins={plugins}
              placeholder={placeholder}
              customStyleMap={customStyleMap}
              ref={editorRef}
            />
            <InlineToolbar>
          {// may be use React.Fragment instead of div to improve perfomance after React 16
          externalProps => (
              <div>
              <FontStyleHandler {...externalProps} />
              <BoldButton {...externalProps} />
              <ItalicButton {...externalProps} />
              <UnderlineButton {...externalProps} />
              <linkPlugin.LinkButton {...externalProps} />
              </div>
          )}
          </InlineToolbar>
        </div>
        {clicked && (
          <ContextMenu top={points.y} left={points.x} ref={rightRef}>
            {/* <ul>
              <li>Edit</li>
              <li>Copy</li>
              <li>Delete</li>
            </ul> */}
            <AddImage editorState={editorState} onChange={imageOnChange} setClicked={setClicked}/>
          </ContextMenu>
        )}
        </>
    );
  }