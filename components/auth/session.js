import { withIronSession, ironSession } from 'next-iron-session';
import axios from 'axios';
import { useRouter } from 'next/router';

const saltFromEnv = process.env.NEXT_PUBLIC_SECRET_COOKIE_PASSWORD;
const password = saltFromEnv
  ? saltFromEnv
  : 'KDKMDKMDKMDKDMnnnnnh8dddh8h08h08h80h80h08h80h80h8h80h08h08hAB'; // hard-coded for Github Actions

const sessionConfig = {
  password: password,
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
