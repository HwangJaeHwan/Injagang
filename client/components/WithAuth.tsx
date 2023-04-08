import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  getProfile,
} from "@/components/redux/Auth/actions";
import { RootReducerType } from "@/components/redux/store";
import { InitiaState } from "@/components/redux/Auth/reducer";

type WithAuthProps = {
  [key: string]: any;
};

const WithAuth = <P extends WithAuthProps>(
  WrappedComponent: React.ComponentType<P>,
) => {
  return (props: P) => {
    const [verified, setVerified] = useState(false);
    const router = useRouter();
    const routes = ["/join", "/login","/","/qna/list"];
    const whiteList = routes.includes(router.asPath);
    const authReducer: InitiaState = useSelector(
      (state: RootReducerType) => state.auth,
    );
    const dispatch = useDispatch();

    useEffect(() => {
      const accessToken = Cookies.get("accessToken");
      //인증이 필요없는 페이지 통과
      if (whiteList){
        return
      }
      if (!accessToken) {
        router.replace("/login");
        return
      } else {
        dispatch(getProfile());
      }
    }, [router.asPath]);

    useEffect(() => {
        if(authReducer.success){
            setVerified(true)
        }
    },[authReducer.success])

    if (verified || whiteList ) {
      return <WrappedComponent {...props} />;
    } else {
      return null;
    }
  };
};

export default WithAuth;
