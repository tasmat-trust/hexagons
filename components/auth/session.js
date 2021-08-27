import { withIronSession, ironSession } from 'next-iron-session';
import axios from 'axios';
import { useRouter } from 'next/router';

const sessionConfig = {
  password: process.env.SECRET_COOKIE_PASSWORD || 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
  cookieName: 'next-session',
  cookieOptions: {
    secure: false,
  },
};

export const sessionMiddleware = ironSession(sessionConfig);

export function withSession(handler) {
  return withIronSession(handler, sessionConfig);
}

export function useLoginLogout(props) {
  const router = useRouter();

  function logout() {
    props.setLoading('Logging you out')
    axios.post('/api/logout').then(() => {
      
      router.push('/login');
      setTimeout(() => props.setLoading(false), 2000)
    });
  }
  function login() {
    router.push('/login');
  }

  return {
    login, 
    logout
  };
}
