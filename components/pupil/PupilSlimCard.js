import PropTypes from 'prop-types';
import makeStyles from '@mui/styles/makeStyles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Link from 'next/link';
import { Typography, Grid } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 14,
  },
  card: {},
}));

function PupilSlimCard({ onwardHref, pupil }) {
  const styles = useStyles();
  return (
    <Typography className={styles.title} component="h2" variant="h4">
      {onwardHref && (
        <Link href={onwardHref}>
          <a data-test-id={`pupil-${pupil.id}`}>{pupil.name}</a>
        </Link>
      )}
    </Typography>
  );
}

PupilSlimCard.propTypes = {
  onwardHref: PropTypes.string,
  pupil: PropTypes.object,
};

export default PupilSlimCard;
