import {
  GET_TOKEN_SUCCESS,
  GET_TOKEN_FAILURE,
  GET_TOKEN_REQUEST,
} from "./types";
import Cookies from "js-cookie";

const initialState = {
  token: "",
  loading: false,
  error: null,
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TOKEN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: Cookies.set("token", action.payload.token),
        user: action.payload.userName,
      };
    case GET_TOKEN_FAILURE:
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
