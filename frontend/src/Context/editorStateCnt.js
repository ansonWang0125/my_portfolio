import React, { useContext } from 'react';
import { useLocalStore } from 'mobx-react-lite';
import { RootStore } from '../Store/RootStore';

import { ThemeProvider } from '@mui/styles';
import { observer } from 'mobx-react-lite';

export const StoreContext = React.createContext({});

export const StoreProvider= ({ children }) => {
  const store = useLocalStore(RootStore);

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

// simplifies imports
export const useStore = () => {
    console.log('fuck', useContext(StoreContext))
  return useContext(StoreContext);
};

export const MuiThemeContext = React.createContext({});

export const MuiThemeProvider = observer(({ children }) => {
  const { themeStore } = useStore();

  return <ThemeProvider theme={themeStore.theme}>{children}</ThemeProvider>;
});
