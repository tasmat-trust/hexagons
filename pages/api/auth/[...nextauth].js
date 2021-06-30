import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import axios from 'axios'

// https://www.gyanblog.com/javascript/next-js-strapi-authentication-credentials-jwt-next-auth/#understanding-getserversideprops
// {
//     jwt: 'xxx',
//     user: {
//       id: 3,
//       organizations: [xxx, xxx],
//       username: 'natalie',
//       email: 'ns....org.uk',
//       provider: 'local',
//       confirmed: true,
//       blocked: false,
//       role: { 
//         id: 1,
//         name: 'Authenticated',
//         description: 'Default role given to authenticated user.',
//         type: 'authenticated'
//       },
//       created_at: '2021-06-16T15:20:59.834Z',
//       updated_at: '2021-06-16T15:20:59.842Z'
//     }
//   }



const options = {
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text", placeholder: "test@test.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/local`, {
            identifier: credentials.email,
            password: credentials.password
          });
          if (data) {
            // TODO refine this - why only name, email, and img coming through?
            // How do I add stuff to session object?
            // Answer: like the id: { .... } item at the top.
            // const user = {
            //     // id: {
            //     //     id: data.user.id,
            //     //     some: 'body'
            //     // },
            //     id: data.user.id,
            //     name: data.user.role.name,
            //     email: data.user.email,
            //     image: data.user.organizations,
            //     jwt: data.jwt
            // }
            const user = {
              email: data.user.email,
              userId: data.user.id,
              org: data.user.organizations[0].name,
              orgId: data.user.organizations[0].id,
              logo: data.user.organizations[0].logo.formats.small.url,
              jwt: data.jwt,
              username: data.user.username,
              some: 'thing',
              role: data.user.role.name
            }
            return user;
          }
        } catch (e) {
          // Redirecting to the login page with error message          in the URL
          // throw new Error(errorMessage + '&email=' + credentials.email)
          return null;
        }
      }
    })
  ],

  session: {
    jwt: true,
  },

  callbacks: {
    // Getting the JWT token from API response

    async signIn(user, account, profile) {
      const isAllowedToSignIn = true
      if (isAllowedToSignIn) {
        return true
      } else {
        // Return false to display a default error message
        return false
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },



    jwt: async (token, user, account) => {
      const isSignIn = user ? true : false;
      if (isSignIn) {
        token.jwt = user.jwt;
        token.id = user.id;
        token.role = user.role
        token.org = user.org
        token.orgId = user.orgId
        token.logo = user.logo
        token.userId = user.userId
        token.username = user.username

      }
      return Promise.resolve(token);
    },

    // Called whenever the session is checked
    // https://next-auth.js.org/configuration/callbacks#session-callback
    // Need to forward stuff from the token for it to appear in session
    session: async (session, token) => {
      session.jwt = token.jwt;
      session.id = token.id;
      session.userId = token.userId;
      session.role = token.role;
      session.org = token.org;
      session.orgId = token.orgId;
      session.username = token.username;
      session.logo = token.logo;
      return Promise.resolve(session);
    },
  }
}

export default (req, res) => NextAuth(req, res, options)