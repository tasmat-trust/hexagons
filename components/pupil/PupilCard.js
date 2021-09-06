import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Link from "next/link"


import { Chip, Typography } from "@material-ui/core"
import CoreSubjectsProgress from "./CoreSubjectsProgress"


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
  ...other }) // pupilId, coreSubjects, activeGroupSlug
{
  const styles = useStyles();
  const baseHref = '/pupils'
  return (
    <Card>
      <CardContent>
        <Typography className={styles.pupilTitle} component='h2' variant='h4'>
          {onwardHref && <Link href={onwardHref} >
            <a>{pupilName}</a>
          </Link>}
        </Typography>
        <ul className={styles.groupUl}>
          {pupilGroups && pupilGroups.map((group, i) => (
            <li key={`pupil-group-${i}`} className={styles.groupLi}>
              <Link href={`${baseHref}/${group.slug}`}>
                <a>
                  <Chip clickable={true} color="primary" size="small" label={group.name} variant="outlined" />
                </a>
              </Link>
            </li>
          ))}
        </ul>
        <CoreSubjectsProgress
          {...other}
        />
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