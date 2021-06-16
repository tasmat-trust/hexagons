import { getSession } from 'next-auth/client'

export default async function checkSession(ctx) {
  const session = await getSession(ctx);
  if (!session) {
    ctx.res.writeHead(302, { Location: '/' })
    ctx.res.end()
  }
  return {
    props: {
      session: session
    }
  }
}
