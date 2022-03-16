import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
    marginTop: '-0.95rem',
  },
  label: {
    width: '150px',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  title: {
    fontFamily: theme.typography.secondaryFamily,
    fontSize: '1.2rem',
    letterSpacing: '0.00735em',
    marginTop: '10px !important',
  },
}));

export default useStyles;
