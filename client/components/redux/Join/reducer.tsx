import {
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_CLEAR,
  signupDispatchType,
} from "./types";

export interface InitiaState {
  loading: boolean;
  error: null;
  status: number;
}

const initalState: InitiaState = {
  loading: false,
  error: null,
  status: 0,
};

const signupReducer = (state = initalState, action: signupDispatchType) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SIGNUP_SUCCESS:
      const {status} = action.payload
      return {
        ...state,
        loading: false,
        status: status,
        error: null,
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error.response.data.message
      };
    case SIGNUP_CLEAR:
      return {
        loading:false,
        error: null,
        status: 0,
      }
    default:
      return state;
  }
};
export default signupReducer;
