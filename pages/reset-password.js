import ResetPasswordForm from '../components/forms/ResetPassword';
import { Paper } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useLoginLogoutPages from '../styles/useLoginLogoutPages';
import CustomHead from '../components/ui-globals/CustomHead';
import { withSession } from '../components/auth/session';
import redirectLoggedInSession from '../components/auth/redirectLoggedInSession';

export default function ResetPassword(props) {
  const router = useRouter();
  const classes = useLoginLogoutPages();
  const [isEmail, setIsEmail] = useState(true);
  const [code, setCode] = useState(null);
  useEffect(() => {
    const { code } = router.query;
    if (code) {
      setIsEmail(false);
      setCode(code);
    }
  }, [router, setIsEmail]);
  return (
    <>
      <CustomHead titleContent="Reset Password" />
      <Paper elevation={1} className={classes.paper}>
        <h1 className={classes.title}>{isEmail ? 'Reset your password' : 'Reset your password'}</h1>
        <ResetPasswordForm isEmail={isEmail} code={code} {...props} />
      </Paper>      
    </>
  );
}

export const getServerSideProps = withSession((ctx) => {
  return redirectLoggedInSession(ctx);
});
