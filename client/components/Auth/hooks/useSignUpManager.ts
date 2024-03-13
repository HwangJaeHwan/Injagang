import React, { useCallback, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { useRouter } from "next/router";

import { RootReducerType } from "@/components/redux/store";
import { memberShipCleare } from "@/components/redux/Join/actions";
import { clearAuthError } from "@/components/redux/Auth/actions";
import { memberShipRequest } from "@/components/redux/Join/actions";

import { ISignup } from "@/types/auth/AuthType";

const useSignUpManager = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, status, error } = useSelector(
    (state: RootReducerType) => state.signup,
  );
  useEffect(() => {
    if (status === 200) {
      router.replace("/login");
      dispatch(clearAuthError());
      dispatch(memberShipCleare());
    } else if (error) {
      throw new Error(error);
    }
  }, [status]);

  const confirmSignUp = useCallback((joinData: ISignup) => {
    dispatch(memberShipRequest(joinData));
  }, []);

  return { loading, error, confirmSignUp };
};

export default useSignUpManager;
