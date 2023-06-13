import React from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth'; 
import { whiteList } from '@/util/whiteList';

const WithAuth = <P extends object>(Component: React.ComponentType<P>) => {
  return (props: P) => {
    const router = useRouter();
    const verified = useAuth();
    const isWhiteListed = whiteList.includes(router.asPath);
    
    if (isWhiteListed || verified) {
      return <Component {...props} />;
    } else {
      return null;
    }
  };
};

export default WithAuth;
