import RegistrationForm from '../components/forms/Registration';
import { Paper, Typography } from '@material-ui/core';
import useSWR from 'swr';
import { getAllOrgs } from '../queries/Organizations';
import useLoginLogoutPages from '../styles/useLoginLogoutPages';
import Link from 'next/link';
import CustomHead from '../components/ui-globals/CustomHead';
import { withSession } from '../components/auth/session';
import redirectLoggedInSession from '../components/auth/redirectLoggedInSession';

function RegistrationFormWithSchools(props) {
  const { data } = useSWR(getAllOrgs, { suspense: true });
  return <RegistrationForm {...props} orgs={data.organizations} />;
}

export default function Register(props) {
  const classes = useLoginLogoutPages();
  return (
    <>
      <CustomHead titleContent="Register" />
      <Paper elevation={1} className={classes.paper}>
        <h1 className={classes.title}>Create account</h1>
        {process.env.NEXT_PUBLIC_DISABLE_REGISTRATION && (
          <p>
            Please note registration is disabled on this installation. Speak to a colleague about
            getting an account.
          </p>
        )}

        {!process.env.NEXT_PUBLIC_DISABLE_REGISTRATION && (
          <RegistrationFormWithSchools {...props} />
        )}
      </Paper>
      <Typography className={classes.secondaryAction}>
        Already have an account? <Link href="/login">Login</Link>
      </Typography>
    </>
  );
}

export const getServerSideProps = withSession((ctx) => {
  return redirectLoggedInSession(ctx);
});
