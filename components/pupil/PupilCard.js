import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Link from "next/link"


import { Chip, Typography } from "@material-ui/core"
import CoreSubjectsProgress from "./CoreSubjectsProgress"
import ErrorBoundary from '../data-fetching/ErrorBoundary';


const useStyles = makeStyles((theme) => ({
  groupUl: {
    listStyle: 'none',
    padding: '0',
    margin: '0'
  },
  groupLi: {
    listStyle: 'none',
    display: 'inline',
    marginRight: '0.5em',
    '&:last-child::after': {
      content: "''"
    },
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  pupilTitle: {
    fontFamily: theme.typography.secondaryFamily
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));



function PupilCard({
  onwardHref,
  pupilName,
  pupilGroups,
  pupilId,
  ...other }) //  coreSubjects, activeGroupSlug
{
  const styles = useStyles();
  const baseHref = '/pupils'
  return (
    <Card>
      <CardContent>
        <ErrorBoundary fallback={<p>Error loading {pupilName}</p>}>
          <Typography className={styles.pupilTitle} component='h2' variant='h4'>
            {onwardHref && <Link href={onwardHref} >
              <a>{pupilName}</a>
            </Link>}
          </Typography>
          <ul className={styles.groupUl} data-test-id={`groups-list-pupil-${pupilId}`}>
            {pupilGroups && pupilGroups.map((group, i) => (
              <ErrorBoundary key={`pupil-group-${i}`} fallback={<p>Error loading {group.name}</p>}>
                <li className={styles.groupLi}>
                  <Link href={`${baseHref}/${group.slug}`}>
                    <a>
                      <Chip clickable={true} color="primary" size="small" label={group.name} variant="outlined" />
                    </a>
                  </Link>
                </li>
              </ErrorBoundary>
            ))}
          </ul>
          <CoreSubjectsProgress
            isPupilCard={true}
            pupilId={pupilId}
            {...other}
          />
        </ErrorBoundary>
      </CardContent>

    </Card >
  )
}

PupilCard.propTypes = {
  baseHref: PropTypes.string,
  onwardHref: PropTypes.string,
  pupilName: PropTypes.string,
  pupilGroups: PropTypes.array
}

export default PupilCard