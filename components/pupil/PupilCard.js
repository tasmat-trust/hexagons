import PropTypes from 'prop-types';
import makeStyles from '@mui/styles/makeStyles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Link from 'next/link';

import { Typography } from '@mui/material';
import CoreSubjectsProgress from './CoreSubjectsProgress';
import CoreSubjectsProgressWithEarlyDevelopment from './CoreSubjectsProgressWithEarlyDevelopment';
import ErrorBoundary from '../data-fetching/ErrorBoundary';
import CustomSuspense from '../data-fetching/CustomSuspense';
import GroupChips from '../groups/GroupChips';

const useStyles = makeStyles((theme) => ({
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  pupilTitle: {
    fontFamily: theme.typography.secondaryFamily,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

function PupilCard({ onwardHref, pupilName, pupilGroups, pupilId, schoolType, ...other }) {
  //  coreSubjects, activeGroupSlug
  const styles = useStyles();
  return (
    <Card>
      <CardContent role="region" aria-live="polite">
        <ErrorBoundary fallback={<p>Error loading {pupilName}</p>}>
          <Typography className={styles.pupilTitle} component="h2" variant="h4">
            {onwardHref && (
              <Link href={onwardHref}>
                <a>{pupilName}</a>
              </Link>
            )}
          </Typography>
          <GroupChips groups={pupilGroups} shouldLink={true} baseHref="/pupils" pupilId={pupilId} />
          <CustomSuspense message="Loading pupil progress">
          {schoolType === 'secondary' && (
            <CoreSubjectsProgress
              isPupilCard={true}
              schoolType={schoolType}
              pupilId={pupilId}
              {...other}
            />
          )}
          {schoolType === 'primary' && (
            <CoreSubjectsProgressWithEarlyDevelopment
              isPupilCard={true}
              pupilId={pupilId}
              schoolType={schoolType}
              {...other}
            />
          )}
          </CustomSuspense>
        </ErrorBoundary>
      </CardContent>
    </Card>
  );
}

PupilCard.propTypes = {
  schoolType: PropTypes.string,
  baseHref: PropTypes.string,
  onwardHref: PropTypes.string,
  pupilName: PropTypes.string,
  pupilGroups: PropTypes.array,
};

export default PupilCard;
