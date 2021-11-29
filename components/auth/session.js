import { withIronSession, ironSession } from 'next-iron-session';
import axios from 'axios';
import { useRouter } from 'next/router';

const sessionConfig = {
  password: process.env.NEXT_PUBLIC_SECRET_COOKIE_PASSWORD,
  cookieName: 'next-session',
  cookieOptions: {
    secure: true,
  },
};

export const sessionMiddleware = ironSession(sessionConfig);

export function withSession(handler) {
  return withIronSession(handler, sessionConfig);
}

export function useLoginLogout() {
  const router = useRouter();
  function logout() {
    axios.post('/api/logout').then(() => {
      router.push('/login');
    });
  }
  function login() {
    router.push('/login');
  }
  return {
    login,
    logout,
  };
}
