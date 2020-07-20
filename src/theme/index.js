import {createMuiTheme} from '@material-ui/core';

const textPrimary = '#28282F';
const secondaryPrimary = '#3F4048';

export const defaultMuiTheme = createMuiTheme({
  palette: {
    // type: 'dark',
    primary: {
      main: '#1692D8',
      contrastText: '#FFF',
    },
    secondary: {
      main: '#9BA6BE',
      contrastText: '#28292F',
    },
    background: {
      paper: '#FFF',
      default: '#f4f6f8',
    },
    text: {
      primary: textPrimary,
      secondary: secondaryPrimary,
    },
  },
});
