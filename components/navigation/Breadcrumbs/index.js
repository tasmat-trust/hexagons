import { Breadcrumbs, Typography } from '@material-ui/core';
import Link from "next/link"
import { ButtonBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  MenuButton: {
    display: 'flex',
    fontSize: '1rem',
    fontFamily: theme.typography.fontFamily
  }

}));

function LinkOrLabel(props) {
  const { href, label } = props
  if (!href && !label) return null
  return (
    <>
      {href && (<Link color="inherit" href={href}>
        {label}
      </Link>)}
      {!href && label && (<Typography>
        {label}
      </Typography>)}
    </>
  )
}



export default function BreadCrumbs(props) {

  const classes = useStyles()
  const { firstLabel, firstHref, secondLabel, secondHref, thirdLabel, thirdHref, fourthLabel, fourthHref } = props

  return (
    <Breadcrumbs aria-label="breadcrumb">
      {firstLabel && <LinkOrLabel href={firstHref} label={firstLabel} />}
      {secondLabel && <LinkOrLabel href={secondHref} label={secondLabel} />}
      {thirdLabel && <LinkOrLabel href={thirdHref} label={thirdLabel} />}
      {fourthLabel && <LinkOrLabel href={fourthHref} label={fourthLabel} />}
    </Breadcrumbs>
  )

}