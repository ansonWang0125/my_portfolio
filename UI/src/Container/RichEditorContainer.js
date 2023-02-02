import React from 'react';
import { observer } from 'mobx-react-lite';
import { RichEditor } from '../Components/EditComponent/RichEditorComponent';
import { ViewPostComponent } from '../Components/EditComponent/Test/ViewPostComponent';
import { useStore } from '../Context/editorStateCnt';

export const Editor = observer(() => {
  const { editorStateStore } = useStore();

  const handleSave = (value) => {
    editorStateStore.newEditorState(value);
  };

  return (
    <>
      <RichEditor
        placeholder="What's on your mind?"
        savedState={editorStateStore.value}
        onSave={(value) => handleSave(value)}
      ></RichEditor>
      {console.log('what the fuck is ')}
      {editorStateStore.value.length > 0 && <ViewPostComponent savedState={editorStateStore.value}></ViewPostComponent>}
    </>
  );
});
