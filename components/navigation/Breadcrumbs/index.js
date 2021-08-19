import { Breadcrumbs, Typography, Box } from '@material-ui/core';
import Link from "next/link"
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  bc: {
    float: 'left'
  },
  clear: {
    clear: 'left'
  },
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
    <>
    <Breadcrumbs className={classes.bc} aria-label="breadcrumb">
      {firstLabel && <LinkOrLabel href={firstHref} label={firstLabel} />}
      {secondLabel && <LinkOrLabel href={secondHref} label={secondLabel} />}
      {thirdLabel && <LinkOrLabel href={thirdHref} label={thirdLabel} />}
      {fourthLabel && <LinkOrLabel href={fourthHref} label={fourthLabel} />}
    </Breadcrumbs>
    <Box className={classes.clear}></Box>
    </>
  )

}