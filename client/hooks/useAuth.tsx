import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProfile } from "@/components/redux/Auth/actions";
import { RootReducerType } from "@/components/redux/store";
import { InitiaState } from "@/components/redux/Auth/reducer";
import Cookies from "js-cookie";

//인증을 위한 훅
export const useAuth = () => {
  const authReducer: InitiaState = useSelector(
    (state: RootReducerType) => state.auth,
  );
  const dispatch = useDispatch();
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");

    if (!accessToken) {
      return;
    }

    dispatch(getProfile());
  }, []);

  useEffect(() => {
    if (authReducer.success) {
      setVerified(true);
    }
  }, [authReducer.success]);

  return verified;
};
