import {
  AUTHENTICATE_REQUEST,
  AUTHENTICATE_SUCCESS,
  AUTHENTICATE_FAILURE,
  CLEAR_ERROR,
  authDispatchType,
  PROFILE_SUCCESS,
  AUTH_INIT,
} from "./types";
import { METHOD } from "@/components/test/fecher";
import fetcher from "@/components/test/fecher";
import { Dispatch } from "redux";
import Cookies from "js-cookie";

type AuthenTicate = {
  loginId: string;
  password: string;
};

type PassWordChange = {
  nowPassword: string;
  changePassword: string;
  changePasswordCheck: string;
};

// const headers = {
//   Authorization: Cookies.get("accessToken"),
// }; // 최악의 오류의 늪에 빠지게한 원인

export const authenTicate =
  (loginData: AuthenTicate) =>
  async (dispatch: Dispatch<authDispatchType>): Promise<void> => {
    try {
      dispatch({ type: AUTHENTICATE_REQUEST });
      const response = await fetcher(METHOD.POST, "/login", loginData);
      if (response) {
        const token = response.data.jws;
        const { access, refresh } = response.data;
        dispatch({
          type: AUTHENTICATE_SUCCESS,
          payload: {
            access,
            refresh,
          },
        });
      }
    } catch (error: any) {
      dispatch({ type: AUTHENTICATE_FAILURE, payload: { error } });
    }
  };

export const checkOut =
  () =>
  async (dispatch: Dispatch<authDispatchType>): Promise<void> => {
    try {
      const data = {
        access: Cookies.get("accessToken"),
        refresh: Cookies.get("refreshToken"),
      };
      const request = await fetcher(METHOD.POST, "/logout", data);
      dispatch({ type: AUTH_INIT });
    } catch (error: any) {
      dispatch({ type: AUTHENTICATE_FAILURE, payload: { error } });
    }
  };

export const getProfile =
  () =>
  async (dispatch: Dispatch<authDispatchType>): Promise<void> => {
    try {
      // console.log({ headers });
      const response = await fetcher(METHOD.GET, "/info", {
        headers: { Authorization: Cookies.get("accessToken") },
      });
      if (response) {
        dispatch({
          type: PROFILE_SUCCESS,
          payload: {
            nickname: response.data.nickname,
            role: response.data.role,
          },
        });
      }
    } catch (error: any) {
      dispatch({ type: AUTHENTICATE_FAILURE, payload: { error } });
    }
  };

export const nicknameChange =
  (nickName: string) =>
  async (dispatch: Dispatch<authDispatchType>): Promise<void> => {
    dispatch({ type: AUTHENTICATE_REQUEST });
    const data = {
      changeNickname: nickName,
    };
    try {
      const response = await fetcher(METHOD.PATCH, "/nicknameChange", data, {
        headers: { Authorization: Cookies.get("accessToken") },
      });
    } catch (error: any) {
      dispatch({ type: AUTHENTICATE_FAILURE, payload: { error } });
    }
  };

export const passWordChange =
  (changePassWordData: PassWordChange) =>
  async (dispatch: Dispatch<authDispatchType>): Promise<void> => {
    dispatch({ type: AUTHENTICATE_REQUEST });
    try {
      const response = await fetcher(
        METHOD.PATCH,
        "/passwordChange",
        changePassWordData,
        {
          headers: { Authorization: Cookies.get("accessToken") },
        },
      );
    } catch (error: any) {
      dispatch({ type: AUTHENTICATE_FAILURE, payload: { error } });
    }
  };

export const clearAuthError = () => ({
  type: CLEAR_ERROR,
});
