import CustomHead from '../components/ui-globals/CustomHead';
import Link from 'next/link';
import usePublicStyles from '../styles/usePublicStyles';
import { Paper } from '@mui/material';

export default function FourOhFour() {
  const styles = usePublicStyles();
  return (
    <>
      <CustomHead titleContent="404 - Page not found" justTitle={true} />
      <Paper className={styles.paper}>
        <h1>404 - Page Not Found</h1>
        <Link href="/">
          <a>Go back home</a>
        </Link>
      </Paper>
    </>
  );
}
