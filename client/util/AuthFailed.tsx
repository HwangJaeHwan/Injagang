import { useRouter } from 'next/router';
import React,{useEffect} from 'react';

const AuthFailed = () => {
    const router = useRouter();
    useEffect(() => {
        router.replace('/login')
    },[])
    return (
        <>
        </>
    );
};

export default AuthFailed;