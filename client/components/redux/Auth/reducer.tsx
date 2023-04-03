import {
  AUTHENTICATE_REQUEST,
  AUTHENTICATE_SUCCESS,
  AUTHENTICATE_FAILURE,
  CLEAR_ERROR,
  authDispatchType,
  PROFILE_SUCCESS,
  AUTH_INIT,
} from "./types";
import Cookies from "js-cookie";

export interface InitiaState {
  loading: boolean;
  error: null;
  role: string;
  success: boolean;
}

const initialState: InitiaState = {
  loading: false,
  role: "",
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
      Cookies.set("userId", userId, {expires:1});
      return {
        ...state,
        loading: false,
        success: true,
      };

    case PROFILE_SUCCESS:
      const { role, nickname } = action.payload;
      sessionStorage.setItem("info", JSON.stringify({ role, nickname }));
      return {
        ...state,
        loading: false,
        nickname,
        role,
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
        role: "",
        error: null,
        success: false,
      }

    default:
      return state;
  }
};

export default authReducer;
