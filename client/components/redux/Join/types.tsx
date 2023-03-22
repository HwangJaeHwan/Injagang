export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = " SIGNUP_FAILURE";

export interface signupRequest {
  type: typeof SIGNUP_REQUEST;
}

export interface signupFailDispatch {
  type: typeof SIGNUP_FAILURE;
  payload: {
    error: any;
  };
}

export interface signupSuccessDispatch {
  type: typeof SIGNUP_SUCCESS;
  payload: {
    status: number,
  },
}

export type signupDispatchType =
  | signupRequest
  | signupFailDispatch
  | signupSuccessDispatch;
