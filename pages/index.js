import Head from 'next/head'
import { signIn, signOut, getSession, useSession } from 'next-auth/client'

export default function Home(initialData) {
  const [session, loading] = useSession()
  return (
    <div className='container'>
      <Head>
        <title>Hexagons</title>
      </Head>

      <h1>Hexagons</h1>

      <div>
        {!session && <>
          Not signed in <br />
          <button onClick={() => signIn()}>Sign in</button>
        </>}
        {session && <>
          Signed in as {session.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>}
      </div>

    </div>
  )
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  if (session) {
    ctx.res.writeHead(302, { Location: '/pupils' })
    ctx.res.end()
    return {}
  }

  return {
    props: {
      session: session
    }
  }

}