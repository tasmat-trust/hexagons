import RegistrationForm from '../components/forms/Registration'
import { Paper, Typography } from '@material-ui/core'
import useSWR from 'swr'
import { getAllOrgs } from '../queries/Organizations'
import useLoginLogoutPages from '../styles/useLoginLogoutPages'
import Link from "next/link"

function RegistrationFormWithSchools(props) {
  const { data } = useSWR(getAllOrgs, { suspense: true })
  return <RegistrationForm {...props} orgs={data.organizations} />
}

export default function Register(props) {
  const classes = useLoginLogoutPages();
  return (
    <>
      <Paper elevation={1} className={classes.paper}>
        <h1 className={classes.title}>Create account</h1>
        <RegistrationFormWithSchools {...props} />
      </Paper>
      <Typography className={classes.secondaryAction}>Already have an account? <Link href="/login">Login</Link></Typography>
    </>
  )
}