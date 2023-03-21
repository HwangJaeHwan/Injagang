export const AUTHENTICATE_REQUEST = "AUTHENTICATE_REQUEST";
export const AUTHENTICATE_SUCCESS = "AUTHENTICATE_SUCCESS";
export const AUTHENTICATE_FAILURE = "AUTHENTICATE_FAILURE";

export interface authRequest {
  type: typeof AUTHENTICATE_REQUEST;
}

export interface authFailDispatch {
  type: typeof AUTHENTICATE_FAILURE;
  payload: {
    error: any;
  };
}

export interface authSuccessDispatch {
  type: typeof AUTHENTICATE_SUCCESS;
  payload: {
    token: string;
    rule: string;
  };
}

export type authDispatchType =
  | authRequest
  | authFailDispatch
  | authSuccessDispatch;
