import {
  AUTHENTICATE_REQUEST,
  AUTHENTICATE_SUCCESS,
  AUTHENTICATE_FAILURE,
  CLEAR_ERROR,
  authDispatchType,
} from "./types";
import { METHOD } from "@/components/test/fecher";
import fetcher from "@/components/test/fecher";
import { Dispatch } from "redux";

type AuthenTicate = {
  loginId: string;
  password: string;
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
            role: loginData.loginId,
          },
        });
      }
    } catch (error: any) {
      console.log("sdafsaasfasas", error.response.data.message);
      dispatch({ type: AUTHENTICATE_FAILURE, payload: { error } });
    }
  };

export const clearAuthError = () => ({
  type: CLEAR_ERROR,
});
