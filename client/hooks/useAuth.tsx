import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProfile } from "@/components/redux/MyProfile/actions";
import { RootReducerType } from "@/components/redux/store";
import Cookies from "js-cookie";

//인증을 위한 훅
export const useAuth = () => {
  const { success: verified } = useSelector(
    (state: RootReducerType) => state.profile,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    if (!accessToken) {
      return;
    }
    dispatch(getProfile());
  }, []);

  return verified;
};
