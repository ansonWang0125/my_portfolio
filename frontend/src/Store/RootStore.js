import { useLocalStore } from 'mobx-react';

import { BugStore } from './BugStore';
import { ComplaintStore } from './ComplaintStore';
import { ThemeStore } from './ThemeStore';
import { EditorStateStore } from './EditorStateStore';
import { ImagesStore } from './ImageStore';

export const RootStore = () => {
  return {
    bugStore: useLocalStore(BugStore),
    themeStore: useLocalStore(ThemeStore),
    imagesStore: useLocalStore(ImagesStore),
    complaintStore: useLocalStore(ComplaintStore),
    editorStateStore: useLocalStore(EditorStateStore),
  };
};
