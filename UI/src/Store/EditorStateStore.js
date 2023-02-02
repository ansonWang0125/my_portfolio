// export class EditorStateRaw {
//   @observable rawString: string;

//   constructor(rawString: string) {
//     this.rawString = rawString;
//   }
// }

export const EditorStateStore = () => {
  return {
    value: '',

    newEditorState(value) {
      this.value = value;
      console.log('new editor value:', this.value);
    },
  };
};
