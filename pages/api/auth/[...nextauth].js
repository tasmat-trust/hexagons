import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import axios from 'axios'

// https://www.gyanblog.com/javascript/next-js-strapi-authentication-credentials-jwt-next-auth/#understanding-getserversideprops

// data on line 26:

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
                        const user = {
                            id: data.user.id,
                            name: data.user.role.name,
                            email: data.user.email,
                            image: data.user.organizations,
                            jwt: data.jwt
                        }
                        return user ? user : data;
                    }
                    else {
                        return null;
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
        jwt: async (token, user, account) => {
            const isSignIn = user ? true : false;
            if (isSignIn) {
                token.jwt = user.jwt;
                token.id = user.id;

            }
            return Promise.resolve(token);
        },

        session: async (session, user) => {
            session.jwt = user.jwt;
            session.id = user.id;
            return Promise.resolve(session);
        },
    }
}

export default (req, res) => NextAuth(req, res, options)