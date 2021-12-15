import makeStyles from '@mui/styles/makeStyles';

const usePublicStyles = makeStyles((theme) => ({
  paper: {
    maxWidth: '40rem',
    margin: '0 auto',
    padding: theme.spacing(3),
  },
  content: {
    flexGrow: '1',
  },
  welcome: {
    textAlign: 'center',
    fontWeight: 'normal',
    fontSize: '1.3rem',
    fontFamily: theme.typography.secondaryFamily,
  },
  openingPara: {
    fontSize: '1.2rem',
    fontFamily: theme.typography.secondaryFamily,
  },
  para: {
    fontSize: '1rem',
  },
  secondPara: {
    fontSize: '0.9rem',
    color: '#666',
    '& a': {
      '&:hover': {
        color: '#000',
      },
      textDecoration: 'underline',
      color: 'inherit',
    },
  },
  button: {
    display: 'block',
    textAlign: 'center',
    margin: '0 auto 1rem auto',
  },
}));

export default usePublicStyles;
