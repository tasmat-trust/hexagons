import { Button } from '@material-ui/core';
import Head from 'next/head';

import { withSession, useLoginLogout } from '../middlewares/session';
import allowPublicSession from '../components/auth/allowPublicSession';

export default function Home(props) {
  const { login } = useLoginLogout(props)
  return (
    <div className="container">
      <Head>
        <title>Hexagons</title>
      </Head>

      {props.user && <h1>Hello, {props.user.username}</h1>}
      {!props.user && (
        <>
          <h1>Welcome to Hexagons.</h1>
          <Button onClick={() => login()}>Login</Button>
        </>
      )}
    </div>
  );
}

export const getServerSideProps = withSession((ctx) => {
  return allowPublicSession(ctx)
})

