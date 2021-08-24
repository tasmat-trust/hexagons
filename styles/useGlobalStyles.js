import { makeStyles } from '@material-ui/core/styles';
import theme from './theme';

const useGlobalStyles = makeStyles((theme) => ({
  "@global": {
    body: {
      "overflow-x": "hidden"
    },
    a: {
      color: theme.palette.text.primary,
      textDecoration: 'none',
      '&:hover': {
        color: theme.palette.text.primary,
        textDecoration: 'underline'
      }
    }
  }
}));

export default useGlobalStyles
