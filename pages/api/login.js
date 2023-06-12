import nc from 'next-connect';
import { sessionMiddleware } from '../../components/auth/session';
import { createStrapiAxios } from '../../utils/strapi';

export default nc()
  .use(sessionMiddleware)
  .post(async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await createStrapiAxios()
        .post(`/api/auth/local`, {
          identifier: email,
          password,
        })
        .then((res) => res.data)
        .then((data) => ({
          ...data.user,
          strapiToken: data.jwt,
        }));

      if (!user.confirmed) {
        return res.status(401).json({
          statusCode: 401,
          message: 'User not confirmed'
        });
      }

      console.log('got user, requesting roles')

      const userWithRolesAndOrg = await createStrapiAxios(user)
        .get(`/api/users/me?populate=*`)
        .then(res => res.data)
        .then(data => data);

    

      const userWithRolesAndOrgAndToken = {...userWithRolesAndOrg, strapiToken: user.strapiToken}

      req.session.set('user', userWithRolesAndOrgAndToken);
      await req.session.save();
      res.json(user);
    } catch (error) {
      console.error(error)
      const { response: fetchResponse } = error;
      if (fetchResponse) {
        return res.status(fetchResponse?.status || 500).json(error.response?.data);
      }
      res.status(500).json(error);
    }
  });
