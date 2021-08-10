import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Link from "next/link"
import { Slider } from "@reach/slider"
import "@reach/slider/styles.css"
import { Typography } from "@material-ui/core"

import { cyan } from '@material-ui/core/colors';
const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
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
    '&::after': {
      content: "'|'",
      paddingLeft: '0.5em',
    }
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

// Uses styled components to customise Reach Slider component
// https://reach.tech/styling/
const StyledSlider = styled(Slider)`
  [data-reach-slider-range] {
    background: ${cyan['A400']}
  }
  [data-reach-slider-handle] {
    background: ${cyan['A500']}
  }
  `


export default function PupilCard(props) {
  const {pupil} = props
  const [onwardHref, setOnwardHref] = useState(props.onwardHref)
  const styles = useStyles();

  useEffect(() => {
    setOnwardHref(props.onwardHref)
  }, [props.onwardHref])


  return (
    <Card className={styles.root}>
      <CardContent>
        <Typography component='h2' variant='h4'>
          {/* <Link href="/pupils/[id]-RANDOM" as={`/pupils/${pupil.id}`}>
            <a>{pupil.name}</a>
          </Link> */}
          {onwardHref && <Link href={onwardHref} >
            <a>{pupil.name}</a>
          </Link>}
        </Typography>
        <ul className={styles.groupUl}>
          {pupil.groups && pupil.groups.map((group, i) => (
            <li key={`pupil-group-${i}`} className={styles.groupLi}>{group.name}</li>
          ))}
        </ul>
        {pupil.subjects && pupil.subjects.map((subject) => (
          <>
            <Typography component="h3" variant="h6">{subject.name}</Typography>
            <StyledSlider disabled={true} value={subject.percent} min={0} max={100} />
          </>
        ))}
      </CardContent>

    </Card >
  )
}
