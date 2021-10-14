import { makeStyles } from '@material-ui/core/styles';

const useGlobalStyles = makeStyles((theme) => ({
  '@global': {
    body: {
      'overflow-x': 'hidden',
    },
    a: {
      color: theme.palette.text.primary,
      textDecoration: 'none',
      '&:hover': {
        color: theme.palette.text.primary,
        textDecoration: 'underline',
      },
    },
    footer: {
      width: '100%',
      textAlign: 'center',
      '& .flink': {
        display: 'inline-block',
        padding: theme.spacing(1),
      },
      '& li a': {
        color: theme.palette.text.secondary
      }
    },
  },
}));

export default useGlobalStyles;
