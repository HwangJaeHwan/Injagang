import Cookies from "js-cookie";

import {
  AUTHENTICATE_REQUEST,
  AUTHENTICATE_SUCCESS,
  AUTHENTICATE_FAILURE,
  CLEAR_ERROR,
  authDispatchType,
  AUTH_INIT,
} from "./types";

export interface InitiaState {
  loading: boolean;
  error: any;
  success: boolean;
}

const initialState: InitiaState = {
  loading: false,
  error: null,
  success: false,
};

const authReducer = (state = initialState, action: authDispatchType) => {
  switch (action.type) {
    case AUTHENTICATE_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
      };

    case AUTHENTICATE_SUCCESS:
      const { access, refresh, userId } = action.payload;
      Cookies.set("accessToken", access, { expires: 1 });
      Cookies.set("refreshToken", refresh, { expires: 1 });
      Cookies.set("userId", userId, { expires: 1 });
      return {
        ...state,
        loading: false,
        success: true,
      };

    case AUTHENTICATE_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
        success: false,
      };

    case AUTH_INIT:
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      return {
        loading: false,
        error: null,
        success: false,
      };

    default:
      return state;
  }
};

export default authReducer;
