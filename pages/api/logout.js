import nc from 'next-connect';
import { sessionMiddleware } from '../../components/auth/session';
import { createStrapiAxios } from '../../utils/strapi';

export default nc()
  .use(sessionMiddleware)
  .post(async (req, res) => {
    req.session.destroy();
    res.send();
  });
