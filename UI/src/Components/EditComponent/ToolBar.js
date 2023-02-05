import '@draft-js-plugins/inline-toolbar/lib/plugin.css';
import '@draft-js-plugins/text-alignment/lib/plugin.css'
import { ItalicButton, BoldButton, UnderlineButton, } from "@draft-js-plugins/buttons";
import createInlineToolbarPlugin from '@draft-js-plugins/inline-toolbar';
import createLinkPlugin from "@draft-js-plugins/anchor";
import FontStyle from "./FontStyle";
import editorStyles from './editorStyles.module.css';
import createTextAlignmentPlugin from '@draft-js-plugins/text-alignment';

export const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;

export const textAlignmentPlugin = createTextAlignmentPlugin();

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
              <textAlignmentPlugin.TextAlignment {...externalProps} />
              </div>
          )}
          </InlineToolbar>
    )
}