import Link from 'next/link';
import makeStyles from '@mui/styles/makeStyles'
;
const useStyles = makeStyles((theme) => ({
  footer: {
    width: '100%',
    textAlign: 'center',
    '& .flink': {
      display: 'inline-block',
      padding: theme.spacing(1),
    },
    '& li a': {
      color: theme.palette.text.secondary,
    },
  },
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <nav>
        <ul>
          <li className="flink">
            <Link href="/accessibility">
              <a title="Hexagons Accessibility">Accessibility</a>
            </Link>
          </li>
          <li className="flink">
            <Link href="/privacy">
              <a title="Hexagons Privacy">Privacy</a>
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
