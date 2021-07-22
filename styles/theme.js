import { createTheme } from '@material-ui/core/styles';
import { red, pink, cyan, grey } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createTheme({
  typography: {
    // Overwrite too-big Material UI defaults
    // https://material-ui.com/customization/typography/
    h1: {
      fontSize: "3rem",
      fontWeight: 400,
      letterSpacing: "0em",
      lineHeight: 1.167
    },
    h2: {
      fontSize: "2.125rem",
      fontWeight: 400,
      letterSpacing: "0.00735em",
      lineHeight: 1.235
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 400,
      letterSpacing: "0em",
      lineHeight: 1.334,
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 500,
      letterSpacing: "0.0075em",
      lineHeight: 1.6
    },
    h5: {
      fontSize: '1rem',
      fontWeight: 500,
      letterSpacing: "0.0075em",
      lineHeight: 1.6
    },
    h6: {
      fontSize: '0.9rem',
      fontWeight: 500,
      letterSpacing: "0.0095em",
      lineHeight: 1.8
    }
  },
  palette: {
    // primary: {
    //   main: pink['500'],
    // },
    // secondary: {
    //   main: cyan.A400,
    // },
    error: {
      main: red.A400,
    },
    background: {
      default: grey['50'],
    },
  },
});


export default theme;