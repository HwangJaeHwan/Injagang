import {
  AUTHENTICATE_REQUEST,
  AUTHENTICATE_SUCCESS,
  AUTHENTICATE_FAILURE,
  CLEAR_ERROR,
  authDispatchType,
  PROFILE_SUCCESS,
} from "./types";
import { METHOD } from "@/components/test/fecher";
import fetcher from "@/components/test/fecher";
import { Dispatch } from "redux";
import Cookies from "js-cookie";

type AuthenTicate = {
  loginId: string;
  password: string;
};

const headers = {
  Authorization: Cookies.get("accessToken"),
};

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

export const getProfile =
  () =>
  async (dispatch: Dispatch<authDispatchType>): Promise<void> => {
    try {
      const response = await fetcher(METHOD.GET, "/info", { headers });
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

export const clearAuthError = () => ({
  type: CLEAR_ERROR,
});
