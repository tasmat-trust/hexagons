
import { makeStyles } from '@material-ui/core/styles';

const useLoginLogoutPages = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      paddingTop: theme.spacing(4)
    },
    input: {
      marginBottom: theme.spacing(2)
    },
    paper: {
      padding: theme.spacing(5),
      width: '25rem',
      margin: '0 auto',
      color: theme.palette.text.secondary,
    }
  }));

export default useLoginLogoutPages
  