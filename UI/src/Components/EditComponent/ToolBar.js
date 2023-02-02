import "draft-js-inline-toolbar-plugin/lib/plugin.css";
import { ItalicButton, BoldButton, UnderlineButton, } from "draft-js-buttons";
import createInlineToolbarPlugin from "draft-js-inline-toolbar-plugin";
import createLinkPlugin from "draft-js-anchor-plugin";
import FontStyle from "./FontStyle";
import editorStyles from './editorStyles.module.css';

export const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;

let themeStyles = {
    input: "input-here",
    inputInvalid: "PUT YOUR INPUT INVALID CLASS HERE"
  };
export const linkPlugin = createLinkPlugin({
    theme: themeStyles,
    placeholder: "http://…"
  });

const FontStyleHandler = (props) => {
    const handleMouseDown = (e) =>e.preventDefault();
    const onClick = () => {props.onOverrideContent(FontStyle); console.log('comeback')}
    return (
      <div onMouseDown={handleMouseDown} className={editorStyles.headlineButtonWrapper}>
        <button onClick={onClick} className={editorStyles.headlineButton}>FontStyle</button>
      </div>
    )
  }

export default function toolbar() {
    return (
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
    )
}