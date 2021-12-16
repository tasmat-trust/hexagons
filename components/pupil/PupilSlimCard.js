import PropTypes from 'prop-types';
import makeStyles from '@mui/styles/makeStyles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Link from 'next/link';
import { Typography } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 14,
  },
}));

function PupilSlimCard({ onwardHref, pupil }) {
  const styles = useStyles();
  return (
    <Card>
      <CardContent role="region" aria-live="polite">
        <Typography className={styles.title} component="h2" variant="h4">
          {onwardHref && (
            <Link href={onwardHref}>
              <a data-test-id={`pupil-${pupil.id}`}>{pupil.name}</a>
            </Link>
          )}
        </Typography>
      </CardContent>
    </Card>
  );
}

PupilSlimCard.propTypes = {
  onwardHref: PropTypes.string,
  pupil: PropTypes.object,
};

export default PupilSlimCard;
