import { getSession } from 'next-auth/client'

export default async function checkSession(ctx, role) {


  function isAuthorized(userRole, requiredRole) {

    if (userRole === 'Senior Leader') {
      return true
    }

    if (userRole === requiredRole) {
      return true
    }

    return false
  }

  function redirectWithMessage(message) {
    ctx.res.writeHead(302, { Location: '/' })
    ctx.res.end()
    return {
      props: {
        message: message
      }
    }
  }



  const session = await getSession(ctx);

  if (!session) {
    return redirectWithMessage('You need to be logged in.')
  }

  const requiredRole = role ? role : 'Teacher'; // All will have role, just in case set to logged in users only
  const userRole = session && session.role ? session.role : 'Public'


  if (!isAuthorized(userRole, requiredRole)) {
    return redirectWithMessage('You do not have permission to view this page.')
  }


  return {
    props: {
      session: session
    }
  }
}
