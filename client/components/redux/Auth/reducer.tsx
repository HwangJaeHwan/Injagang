import {
  AUTHENTICATE_REQUEST,
  AUTHENTICATE_SUCCESS,
  AUTHENTICATE_FAILURE,
  authDispatchType
} from "./types";
import Cookies from "js-cookie";

interface InitiaState {
  loading: boolean;
  error: null;
  rule: string;
  token: string;
}

const initialState: InitiaState = {
  token: "",
  loading: false,
  rule: '',
  error: null,
};

const authReducer = (state = initialState, action: authDispatchType) => {
  switch (action.type) {
    case AUTHENTICATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case AUTHENTICATE_SUCCESS:
      const {token, rule} = action.payload
      return {
        ...state,
        loading: false,
        token:  Cookies.set("jwtToken",token),
        rule:  rule,
      };
    case AUTHENTICATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
