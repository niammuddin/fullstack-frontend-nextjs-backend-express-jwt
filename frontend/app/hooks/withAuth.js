'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const withAuth = (WrappedComponent, allowedRoles) => {
  return (props) => {
    const { data: session, status } = useSession();
    const loading = status === 'loading';
    const router = useRouter();

    useEffect(() => {
      if (!loading) {
        if (!session) {
          console.log('No session, redirecting to login...');
          router.replace(`/auth/login?callbackUrl=${encodeURIComponent(router.asPath)}`);
        } else if (session && allowedRoles && !allowedRoles.includes(session.user.role)) {
          console.log(`Unauthorized role: ${session.user.role}, redirecting to 403...`);
          router.replace('/errors/403');
        } else {
          console.log('Session and role authorized:', session.user.role);
        }
      }
    }, [loading, session, router, allowedRoles]);

    if (loading || !session) {
      console.log('Loading or no session, showing loading...');
      return <div>Loading...</div>;
    }

    if (session && allowedRoles.includes(session.user.role)) {
      console.log('Rendering wrapped component...');
      return <WrappedComponent {...props} />;
    }

    return null;
  };
};

export default withAuth;
