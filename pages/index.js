import Head from 'next/head';

import HomepageLoggedIn from '../components/homepage/HomepageLoggedIn';
import HomepageLoggedOut from '../components/homepage/HomepageLoggedOut';

import { withSession } from '../components/auth/session';
import allowPublicSession from '../components/auth/allowPublicSession';

export default function Home(props) {
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

