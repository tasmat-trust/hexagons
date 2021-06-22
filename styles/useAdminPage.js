
import { makeStyles } from '@material-ui/core/styles';

const useAdminPage = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      paddingTop: theme.spacing(4)
    },
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
    },
    box: {
      display: 'flex',
      marginBottom: theme.spacing(3)
    },
    button: {
      margin: theme.spacing(1),
    },
    title: {
      flexGrow: 1,
    },
    schoolCard: {
      padding: theme.spacing(1),
      textAlign: 'center'
    },
    schoolCard_img: {
      padding: theme.spacing(1)
    }
  }));

export default useAdminPage
  