import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { clearAuthError } from "@/components/redux/Auth/actions";
import { RootReducerType } from "@/components/redux/store";

import { ERROR_MESSAGES } from "@/constants";
import { getProfile } from "@/components/redux/MyProfile/actions";

const useLoginManager = () => {
  const dispatch = useDispatch();
  const [userMsg, setUserMsg] = useState<string>("");
  const { error, success } = useSelector(
    (state: RootReducerType) => state.auth,
  );
  const router = useRouter();

  const dispatchGetProfile = useCallback(() => {
    dispatch(getProfile);
  }, []);

  useEffect(() => {
    if (success) {
      dispatch(getProfile());
      dispatch(clearAuthError());
      router.replace("/");
      return;
    }
    if (error) {
      setUserMsg(ERROR_MESSAGES.DOESN_T_MATCH);
    }
  }, [error, success]);

  return { userMsg, dispatchGetProfile };
};

export default useLoginManager;
