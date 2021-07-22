export default function allowPublicSession(ctx) {
  const { req } = ctx;
  return {
    props: {
      user: req.session.get('user') || null,
    },
  };
}