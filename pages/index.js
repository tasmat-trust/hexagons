import { Button } from '@material-ui/core';
import Head from 'next/head';

import HomepageLoggedIn from '../components/homepage/HomepageLoggedIn';
import HomepageLoggedOut from '../components/homepage/HomepageLoggedOut';

import { withSession, useLoginLogout } from '../middlewares/session';
import allowPublicSession from '../components/auth/allowPublicSession';

export default function Home(props) {
  const { login } = useLoginLogout(props)
  return (
    <div className="container">
      <Head>
        <title>Hexagons</title>
      </Head>
      {props.user && <HomepageLoggedIn {...props} />}
      {!props.user && <HomepageLoggedOut {...props} />}
    </div>
  );
}

export const getServerSideProps = withSession((ctx) => {
  return allowPublicSession(ctx)
})

