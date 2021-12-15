import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Link from 'next/link';
import sortByName from '../../utils/sortByName';

import { Chip, Typography } from '@mui/material';
import CoreSubjectsProgress from './CoreSubjectsProgress';
import CoreSubjectsProgressWithEarlyDevelopment from './CoreSubjectsProgressWithEarlyDevelopment';
import ErrorBoundary from '../data-fetching/ErrorBoundary';

const useStyles = makeStyles((theme) => ({
  groupUl: {
    listStyle: 'none',
    padding: '0',
    margin: '0',
  },
  groupLi: {
    listStyle: 'none',
    display: 'inline-block',
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    '&:last-child::after': {
      content: "''",
    },
  },
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
  const baseHref = '/pupils';

  const sortedGroups = pupilGroups ? sortByName(pupilGroups) : null;

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
          <ul className={styles.groupUl} data-test-id={`groups-list-pupil-${pupilId}`}>
            {sortedGroups &&
              sortedGroups.map((group, i) => (
                <ErrorBoundary
                  key={`pupil-group-${i}`}
                  fallback={<p>Error loading {group.name}</p>}
                >
                  <li className={styles.groupLi}>
                    <Link href={`${baseHref}/${group.slug}`}>
                      <a>
                        <Chip clickable={true} size="small" label={group.name} />
                      </a>
                    </Link>
                  </li>
                </ErrorBoundary>
              ))}
          </ul>
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
              getEarlyDevelopmentBySlugVariables={{ slug: 'early-development' }}
              {...other}
            />
          )}
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
