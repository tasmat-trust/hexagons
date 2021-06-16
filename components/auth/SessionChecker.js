import { getSession } from 'next-auth/client'

export function SessionChecker(Wrapped) {
  return function NewComponent(props) {
      return <Wrapped {...props} />
  }
}

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
