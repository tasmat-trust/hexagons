
import { makeStyles } from '@material-ui/core/styles';

const useLoginLogoutPages = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: theme.spacing(4)
  },
  title: {
    fontFamily: theme.typography.secondaryFamily,
    color: theme.palette.text.primary
  },
  input: {
    marginTop: theme.spacing(2)
  },
  mbelow: {
    marginBottom: theme.spacing(2)
  },
  secondaryAction: {
    marginTop: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.grey[600]
  },
  paper: {
    "@media(max-width:600px)": {
      padding: theme.spacing(2),
      width: 'auto'
    },
    padding: theme.spacing(5),
    width: '25rem',
    margin: '0 auto',
    color: theme.palette.text.secondary,
  }
}));

export default useLoginLogoutPages
