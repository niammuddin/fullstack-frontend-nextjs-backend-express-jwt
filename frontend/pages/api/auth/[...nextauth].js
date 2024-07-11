import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const refreshAccessToken = async (token) => {
  try {
    const response = await axios.post(`${apiUrl}/auth/refresh-token`, {
      refreshToken: token.refreshToken,
    });

    const { accessToken } = response.data;
    const decoded = jwtDecode(accessToken);

    console.log('Access token refreshed:', accessToken);

    return {
      ...token,
      accessToken,
      expiresAt: decoded.exp,
    };
  } catch (error) {
    console.error('Error refreshing access token:', error);
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
};

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      authorize: async (credentials) => {
        try {
          const res = await axios.post(`${apiUrl}/auth/login`, {
            email: credentials.email,
            password: credentials.password
          });

          const { accessToken, refreshToken } = res.data;
          const decoded = jwtDecode(accessToken);

          console.log('Access token received:', accessToken);

          if (decoded) {
            return {
              id: decoded.id,
              email: credentials.email,
              role: decoded.role,
              accessToken,
              refreshToken,
              expiresAt: decoded.exp,
            };
          }
          return null;
        } catch (error) {
          console.error('Error in authorize:', error.response ? error.response.data : error.message);
          return null;
        }
      }
    })
  ],
  session: {
    jwt: true,
    maxAge: 7 * 24 * 60 * 60, // 7 hari dalam detik
    // updateAge: 1 * 60, // x menit dalam detik
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log('JWT callback', token);
      if (user) {
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          expiresAt: user.expiresAt,
          id: user.id,
          role: user.role,
        };
      }

      // if (Date.now() / 1000 < token.expiresAt) {
      //   return token;
      // }

      // Tentukan waktu buffer sebelum token kedaluwarsa (misalnya 60 detik)
      const shouldRefreshTime = Date.now() / 1000 + 30;

      // Jika waktu saat ini kurang dari waktu kedaluwarsa token dikurangi waktu buffer, token tidak perlu diperbarui
      if (token.expiresAt && Date.now() / 1000 < token.expiresAt - shouldRefreshTime) {
        return token;
      }

      console.log('Refreshing access token');
      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      if (Date.now() / 1000 > token.expiresAt) {
        return null;
      } else {
        session.accessToken = token.accessToken;
        session.user.id = token.id;
        session.user.role = token.role;
        session.expires = new Date(token.expiresAt * 1000).toISOString();
        session.error = token.error;
        console.log('Session callback', session);
        return session;
      }
    }
  },
  pages: {
    signIn: '/auth/login'
  },
  secret: process.env.NEXTAUTH_SECRET,
});
