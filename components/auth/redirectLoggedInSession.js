
export default function redirectLoggedInSession(ctx) {
  const { req } = ctx;

  const loggedInUser = req.session.get('user') || null

  if (loggedInUser) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      },
      props: {
        user: loggedInUser,
      }
    }
  }

  return {
    props: {},
  };
}