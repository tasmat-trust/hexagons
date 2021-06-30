import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
  },
  logo: {
    maxWidth: '80%',
    padding: theme.spacing(2)
  }
}))

function OrgPicker({ session }) {

  if (!session) return ''

  const classes = useStyles()
  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  let img, alt
  if (session.logo) {
    img = session.logo
    alt = session.org
  }
  if (img) return (
    <Box className={classes.root}>
      <img className={classes.logo} src={`${apiUrl}${img}`} alt={`${alt}'s Logo`} />
    </Box>
  )
  return ''
}

export default OrgPicker