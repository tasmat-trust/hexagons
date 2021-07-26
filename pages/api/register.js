import nc from 'next-connect';
import { sessionMiddleware } from '../../middlewares/session';
import { createStrapiAxios } from '../../utils/strapi';

export default nc()
  .use(sessionMiddleware)
  .post(async (req, res) => {
    const { email, password, username, organization } = req.body;

    try {
      const user = await createStrapiAxios()
        .post(`/auth/local/register`, {
          username,
          email,
          password,
          organization
        })
        .then((res) => res.data)
        .then((data) => {
          console.log(data);
          return {
            ...data.user,
            strapiToken: data.jwt,
          };
        });

      if (!user.confirmed) {
        return res.status(200).json({
          statusCode: 200,
          message: 'User not confirmed'
        });
      }

      req.session.set('user', user);
      await req.session.save();
      res.json(user);
    } catch (error) {
      const { response: fetchResponse } = error;
      if (fetchResponse) {
        return res.status(fetchResponse?.status || 500).json(error.response?.data);
      }
      res.status(505).json(error);
    }
  });
