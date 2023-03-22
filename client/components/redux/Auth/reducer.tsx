import {
  AUTHENTICATE_REQUEST,
  AUTHENTICATE_SUCCESS,
  AUTHENTICATE_FAILURE,
  authDispatchType,
} from "./types";
import Cookies from "js-cookie";

export interface InitiaState {
  loading: boolean;
  error: null;
  rule: string;
  success: boolean;
}

const initialState: InitiaState = {
  loading: false,
  rule: "",
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
      const { token, rule } = action.payload;
      return {
        ...state,
        loading: false,
        success: true,
        token: Cookies.set("jwtToken", token, {expires: 1}),
        rule: rule,
      };
    case AUTHENTICATE_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
