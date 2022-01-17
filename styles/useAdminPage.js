
import makeStyles from '@mui/styles/makeStyles';

const useAdminPage = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: theme.spacing(1)
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
    display: 'block',
    columns: 'auto 3',
    columnGap: '20px',
    columnRule: `1px dotted ${theme.palette.text.primary}`
  },
  listItem: {
    listStyle: 'none',
    width: '100%',
    textAlign: 'center',
    lineHeight: '1.2',
    '& a': {
      display: 'block',
      width: '100%',
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      fontSize: '1rem'
    }
  },

  groupBox_title: {
    lineHeight: 1,
    margin: 0,
  }
}));

export default useAdminPage
