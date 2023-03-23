import {
  AUTHENTICATE_REQUEST,
  AUTHENTICATE_SUCCESS,
  AUTHENTICATE_FAILURE,
  CLEAR_ERROR,
  authDispatchType,
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
      const { token, role } = action.payload;
      Cookies.set("jwtToken", token, { expires: 1 });
      return {
        ...state,
        loading: false,
        success: true,
        role: role,
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
      };
    default:
      return state;
  }
};

export default authReducer;
