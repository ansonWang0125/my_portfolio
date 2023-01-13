import React, { useState } from 'react';
import { Editor, EditorState, convertToRaw, convertFromRaw, RichUtils, CompositeDecorator, KeyBindingUtil,Modifier,getDefaultKeyBinding,} from 'draft-js';
import { makeStyles } from '@mui/styles';
import { BlockStyleControls } from './Test/BlockStyleControls';
import { InlineStyleControls } from './Test/InlineStyleControls';
import { StyleButton } from './Test/StyleButton';

//new
import {stateToMarkdown} from 'draft-js-export-markdown';

function findLinkEntities(contentBlock, callback, contentState) {
    contentBlock.findEntityRanges((character) => {
      const entityKey = character.getEntity();
      return entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK';
    }, callback);
  }
const Link = (props) => {
    const { url } = props.contentState.getEntity(props.entityKey).getData();
    return <a href={url}>{props.children}</a>;
  };
const initializeState = (savedState) => {
    const decorator = new CompositeDecorator([
      {
        strategy: findLinkEntities,
        component: Link,
      },
    ]);
  
    let initialEditorState;
    if (savedState.length > 0) {
      console.log('RichEditorComp: ', savedState);
      const deSerializedDraftState = JSON.parse(savedState);
      const savedContentState = convertFromRaw(deSerializedDraftState);
      initialEditorState = EditorState.createWithContent(savedContentState, decorator);
      console.log('RichEditorComp init:', stateToMarkdown(initialEditorState.getCurrentContent()));
    } else {
      const initialBlankEditorContentState = EditorState.createEmpty().getCurrentContent();
      initialEditorState = EditorState.createWithContent(initialBlankEditorContentState, decorator);
    }
  
    return initialEditorState;
};

const useStyles = makeStyles({
    CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2,
      },
})

export const RichEditor = ({placeholder, savedState = '', onSave, readOnly= false}) =>{
    const classes = useStyles();

    //new
    const [editorState, setEditorState] = useState(initializeState(savedState));
    if (readOnly) console.log('read only editor', stateToMarkdown(editorState.getCurrentContent()));

    let className = 'RichEditor-editor';

    const {  onTab, toggleBlockType, toggleInlineStyle } = RichUtils;
    const { hasCommandModifier } = KeyBindingUtil;

    const addLink = () => {
        console.log('in addlink');
        const selectionState = editorState.getSelection();
        const link = window.prompt('Paste your link: ');
        if (!link) {
          // onEditorChange(RichUtils.toggleLink(editorState, selectionState, null));
          return;
        }
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', {
          url: link,
        });
    
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const contentStateWithLink = Modifier.applyEntity(contentStateWithEntity, selectionState, entityKey);
        const newEditorState = EditorState.set(editorState, {
          currentContent: contentStateWithLink,
        });
    
        onEditorChange(RichUtils.toggleLink(newEditorState, newEditorState.getSelection(), entityKey));
        return;
    };

    const customKeyBindingFn = (e) => {
        if (e.keyCode === 9 /* TAB */) {
          // exception, changing tate here as need access to event
          const newEditorState = onTab(e, editorState, 4 /* maxDepth */);
          setEditorState(newEditorState);
          return 'editor-tab';
        }
        // Key keycode of each key: https://keycode.info/
        else if (e.keyCode === 83 /* `S` key */ && hasCommandModifier(e)) {
          return 'editor-save';
        } else if (e.keyCode === 66 /* `B` key */ && hasCommandModifier(e)) {
          return 'editor-toggle-bold';
        } else if (e.keyCode === 73 /* `I` key */ && hasCommandModifier(e)) {
          return 'editor-toggle-italic';
        } else if (e.keyCode === 85 /* `U` key */ && hasCommandModifier(e)) {
          return 'editor-toggle-underline';
        } else if (e.keyCode === 75 /* `k` key */ && hasCommandModifier(e)) {
          return 'editor-toggle-link';
        }
        return getDefaultKeyBinding(e);
      };

      const customHandleKeyCommand = (command, editorState) => {
        switch (command) {
          case 'editor-tab':
            return 'handled';
    
          case 'editor-save':
            console.log('customHandleKeyCommand:: editor-save');
            console.log(stateToMarkdown(editorState.getCurrentContent()));
            onSave(JSON.stringify(convertToRaw(editorState.getCurrentContent()), null, 2));
            return 'handled';
    
          case 'editor-toggle-bold':
            customToggleInlineStyle('BOLD');
            return 'handled';
    
          case 'editor-toggle-italic':
            customToggleInlineStyle('ITALIC');
            return 'handled';
    
          case 'editor-toggle-underline':
            customToggleInlineStyle('UNDERLINE');
            return 'handled';
    
          case 'editor-toggle-link':
            addLink();
            return 'handled';
    
          default:
            return 'not-handled';
        }
      };
    const customToggleBlockType = (blockType) => {
        const newState = toggleBlockType(editorState, blockType);
        setEditorState((editorState) => newState);
      };

    const customToggleInlineStyle = (blockType) => {
        const newState = toggleInlineStyle(editorState, blockType);
        setEditorState((editorState) => newState);
    };

    const onEditorChange = (newState) => {
        setEditorState((editorState) => newState);
      };
    
      const getBlockStyle = (block) => {
        switch (block.getType()) {
          case 'blockquote':
            return 'RichEditor-blockquote';
          default:
            return null;
        }
      };

    return (
      <div className="RichEditor-root">
        <BlockStyleControls editorState={editorState} onToggle={customToggleBlockType} />
        <InlineStyleControls editorState={editorState} onToggle={customToggleInlineStyle} />
        <StyleButton key="Link" label="Link" onToggle={addLink} style="LINK" className={'RichEditor-styleButton'} />
      {/* <div className={className} onClick={this.focus}> */}
      <div className={className}>
        <Editor
          // @ts-ignore
          blockStyleFn={getBlockStyle}
          customStyleMap={classes}
          editorState={editorState}
          handleKeyCommand={customHandleKeyCommand}
          keyBindingFn={customKeyBindingFn}
          onChange={onEditorChange}
          placeholder={placeholder}
          readOnly={readOnly}
          // TODO: make ref work
          // ref="editor"
          spellCheck={true}
        />
      </div>
    </div>
    )
}