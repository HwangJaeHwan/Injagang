import {
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
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
      console.log("SAAsdASDAsdASDAsdSADA",status)
      return {
        ...state,
        loading: false,
        status: status,
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default signupReducer;
