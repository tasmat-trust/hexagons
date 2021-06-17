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


  const classes = useStyles()
  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  let img, alt
  if (session.user.image.length > 0) {
    img = session.user.image[0].logo.url
    alt = session.user.image[0].name
  }
  if (img) return (
    <Box className={classes.root}>
      <img className={classes.logo}  src={`${apiUrl}${img}`} alt={`${alt}'s Logo`} />
    </Box>
  )
  return ''
}

export default OrgPicker