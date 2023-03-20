import {
  GET_TOKEN,
  GET_TOKEN_REQUEST,
  GET_TOKEN_FAILURE,
  GET_TOKEN_SUCCESS,
} from "./types";
import { METHOD } from "@/components/test/fecher";
import fetcher from "@/components/test/fecher";
import Cookies from "js-cookie";

interface getToken {
  loginId: string;
  password: string;
}

export const getToken = (data: getToken) => async dispatch => {
  try {
    dispatch({ type: GET_TOKEN_REQUEST });
    const response = await fetcher(METHOD.POST, "/login", data);
    if (response) {
      const token = response.data.rws;
      dispatch({
        type: GET_TOKEN_SUCCESS,
        payload: { token, userName: data.loginId },
      });
    }
  } catch (error) {
    dispatch({ type: GET_TOKEN_FAILURE, payload: error });
  }
};
