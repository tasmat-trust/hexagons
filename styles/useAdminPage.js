
import { makeStyles } from '@material-ui/core/styles';

const useAdminPage = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      paddingTop: theme.spacing(4)
    },
    paper: {
      padding: theme.spacing(2), 
    },
    paperAlert: {
      marginBottom: theme.spacing(3),
      width: '100%'
    },
    box: {
      display: 'flex',
      width: '100%',
      marginBottom: theme.spacing(3)
    },
    button: {
      margin: theme.spacing(1),
    },
    title: {
      flexGrow: 1,
      'font-family': theme.typography.secondaryFamily
    },
    schoolCard: {
      padding: theme.spacing(1),
      textAlign: 'center'
    },
    schoolCard_img: {
      padding: theme.spacing(1)
    },
    ul: {
      padding: 0,
      width: '100%',
      margin: 0,
      display: 'block'
    },
    listItem: {
      listStyle: 'none',
      display: 'block',
      width: '100%',
      padding: 0,
    },
    groupBox: {
      padding: 0,
      display: 'flex',
      marginBottom: theme.spacing(1)
    },
    groupBox_link: {
      display: 'block',
      width: '100%',
      padding: theme.spacing(2)
    },
    groupBox_title: {
      lineHeight: 1,
      margin: 0,
    }
  }));

export default useAdminPage
  