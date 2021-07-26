import LoginForm from '../components/forms/Login'
import useLoginLogoutPages from '../styles/useLoginLogoutPages'
import { Paper } from '@material-ui/core';
export default function AccountConfirmed(props) {
  const classes = useLoginLogoutPages();
  return (
    <Paper elevation={1} square className={classes.paper}>
      <h1>Login to Hexagons</h1>
      <p>Your account has been confirmed.</p>
      <LoginForm {...props} />
    </Paper>
  )
}