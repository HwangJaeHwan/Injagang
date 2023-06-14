import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth'; 
import { whiteList } from '@/util/whiteList';
import AuthFailed from '@/util/authFailed';

const WithAuth = <P extends object>(Component: React.ComponentType<P>) => {
  return (props: P) => {
    const router = useRouter();
    const verified = useAuth();
    const isWhiteListed = whiteList.includes(router.asPath);
    console.log(router.asPath)
    
    if (isWhiteListed || verified) {
      return <Component {...props} />;
    } else {
      return <AuthFailed/>;
      
    }
  };
};

export default WithAuth;
