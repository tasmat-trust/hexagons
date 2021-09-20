import LoginForm from '../components/forms/Login'
import useLoginLogoutPages from '../styles/useLoginLogoutPages'
import { Paper } from '@material-ui/core';
import CustomHead from '../components/ui-globals/CustomHead';
export default function AccountConfirmed(props) {
  const classes = useLoginLogoutPages();
  return (
    <>
      <CustomHead titleContent="Account Confirmed" justTitle={true} />
      <Paper elevation={1} square className={classes.paper}>
        <h1>Login to Hexagons</h1>
        <p>Your account has been confirmed.</p>
        <LoginForm {...props} />
      </Paper>
    </>
  )
}