import LoginForm from '../components/forms/Login'
import { Paper, Typography } from '@material-ui/core'
import Link from 'next/link'
import useLoginLogoutPages from '../styles/useLoginLogoutPages'

export default function LoginPage(props) {
  const classes = useLoginLogoutPages();
  return (
    <>
      <Paper elevation={1} square className={classes.paper}>
        <h1>Login to Hexagons</h1>
        <LoginForm {...props} />
      </Paper>
      <Typography className={classes.secondaryAction}>Need an account? <Link href="/register">Register</Link></Typography>
    </>
  )
}