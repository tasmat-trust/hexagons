import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Image from 'next/image'
const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
  },
  imgContainer: {
    padding: theme.spacing(3)
  }
}))

function OrgPicker({ session }) {

  const classes = useStyles()
  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  if (!session) return ''

  let img, alt
  if (session.logo) {
    img = session.logo.url
    alt = session.org
  }
  if (img) return (
    <Box className={classes.root}>
      <Box className={classes.imgContainer}>
        <Image
          className={classes.logo}
          width={session.logo.width}
          height={session.logo.height}
          src={`${apiUrl}${img}`}
          alt={`${alt}'s Logo`} />
      </Box>
    </Box>
  )
  return ''
}

export default OrgPicker