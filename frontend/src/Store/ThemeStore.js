// MUI
import { createMuiTheme } from '@material-ui/core/styles';
import { blue, purple } from '@material-ui/core/colors';

export const ThemeStore = () => {
  const lightTheme = createMuiTheme({
    palette: {
      primary: blue,
      type: 'light',
    },
  });

  const darkTheme = createMuiTheme({
    palette: {
      primary: purple,
      type: 'dark',
    },
  });

  return {
    theme: lightTheme,
    isDarkMode: false,

    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      this.theme = this.isDarkMode ? darkTheme : lightTheme;
      console.log('Theme DarkMode:', this.theme.palette.type);
    },
  };
};
