export default function checkSession(ctx, role) {
  const { req } = ctx;
  const user = req.session.get('user') || null;
  function isAuthorized(userRole, requiredRole) {
    if (userRole === 'Leader') {
      return true;
    }

    if (userRole === requiredRole) {
      return true;
    }

    return false;
  }

  function redirectWithMessage(message) {
    ctx.res.writeHead(302, { Location: '/login' });
    ctx.res.end();
    return {
      props: {
        message: message,
      },
    };
  }

  if (!user) {
    return redirectWithMessage('You need to be logged in.');
  }

  const requiredRole = role ? role : 'Teacher'; // All will have role, just in case set to logged in users only
  const userRole = user && user.role && user.role.name ? user.role.name : 'Public';

  if (!isAuthorized(userRole, requiredRole)) {
    return redirectWithMessage('You do not have permission to view this page.');
  }

  return {
    props: {
      user: user,
    },
  };
}
