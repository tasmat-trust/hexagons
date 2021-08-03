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

function OrgPicker({ user }) {

  const classes = useStyles()
  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  if (!user) return ''

  let img, alt
  if (user && user.organization) {
    img = user.organization.logo.url
    alt = user.organization.name
  }
  if (img) return (
    <Box className={classes.root}>
      <Box className={classes.imgContainer}>
        <Image
          className={classes.logo}
          width={user.organization.logo.width}
          height={user.organization.logo.height}
          src={`/${apiUrl}${img}`}
          alt={`${alt}'s Logo`} />
      </Box>
    </Box>
  )
  return ''
}

export default OrgPicker