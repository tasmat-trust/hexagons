import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import PupilName from './PupilName'

import Link from "next/link"
import { Slider } from "@reach/slider"
import "@reach/slider/styles.css"
import { ListItem } from '@material-ui/core';


const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function PupilCard({ pupil }) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>

        <PupilName pupil={pupil} typographyVariant="h5" />

        <ul>
          {pupil.groups.map((group) => (
            <li>{group}</li>
          ))}
        </ul>
        {pupil.subjects.map((subject) => (
          <>
            <h3>{subject.name}</h3>
            <Slider disabled={true} value={subject.percent} min={0} max={100} />
          </>
        ))}
      </CardContent>
      <CardActions>
        <ListItem button key={pupil.name}>
          <Link href="/pupils/[id]" as={`/pupils/${pupil.id}`}>
            <>
              View {pupil.name}'s profile
            </>
          </Link>
        </ListItem>
      </CardActions>
    </Card >
  )
}
