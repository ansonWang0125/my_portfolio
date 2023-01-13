import TextField from '@mui/material/TextField';
import { makeStyles, ThemeProvider } from '@mui/styles';
import { createTheme} from '@mui/material/styles';
import { RichUtils} from 'draft-js';
import useStyleMap from '../styleMap/useStyleMap';
import React, { useState, useEffect} from "react";
const theme = createTheme();

const useStyles = makeStyles({
    textField: {
    // paddingLeft: theme.spacing(),
    // paddingRight: theme.spacing(),
    "& .MuiInputBase-root":{
        height:30,
        width:120
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




export default function FontStyle (props) {
    const classes = useStyles();
    const { fontFamilyStyleMap, fontSizeStyleMap} = useStyleMap();
    const editorState = props.getEditorState()
    const [fontFamilySelected, setFontFamilySelected] = useState('');
    const [fontSizeSelected, setFontSizeSelected] = useState('');
    const [hasSetFont, setHasSetFont] = useState(false);

    useEffect(() => {
        const onWindowClick = () => props.onOverrideContent(undefined);
        if (hasSetFont) {
            onWindowClick();
        }
      }, [hasSetFont, props]);

    const handleChangeEditorState = (internalEditorState) => {
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
        props.setEditorState(internalEditorState);
        setHasSetFont(true);
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
        console.log(inlineStyle)
          handleChangeEditorState(RichUtils.toggleInlineStyle(editorState,inlineStyle));
      }
  }

  const handleChangeFontFamilySelected = (event) => {
      setFontFamilySelected(event.target.value);
      handleToggleFontFamilyInlineStyleClick(event.target.value);
      setHasSetFont(true);
  }

  const handleChangeFontSizeSelected = (event) => {
      setFontSizeSelected(event.target.value);
      handleToggleFontSizeInlineStyleClick(event.target.value);
  }
    return (
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
    )
}