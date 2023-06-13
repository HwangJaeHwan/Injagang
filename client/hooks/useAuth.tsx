import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProfile } from "@/components/redux/Auth/actions";
import { RootReducerType } from "@/components/redux/store";
import { InitiaState } from "@/components/redux/Auth/reducer";
import Router, { useRouter } from "next/router";
import Cookies from "js-cookie";

export const useAuth = () => {
  const authReducer: InitiaState = useSelector(
    (state: RootReducerType) => state.auth,
  );
  const router = useRouter();
  const dispatch = useDispatch();
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");

    if (!accessToken) {
      router.replace("/login");
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
