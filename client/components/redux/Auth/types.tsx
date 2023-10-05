export const AUTHENTICATE_REQUEST = "AUTHENTICATE_REQUEST";
export const AUTHENTICATE_SUCCESS = "AUTHENTICATE_SUCCESS";
export const AUTHENTICATE_FAILURE = "AUTHENTICATE_FAILURE";
export const AUTH_INIT = "AUTH_INIT";
export const CLEAR_ERROR = "CLEAR_ERROR";

export interface authRequest {
  type: typeof AUTHENTICATE_REQUEST;
}

export interface CLEAR_ERROR {
  type: typeof CLEAR_ERROR;
  payload: {
    error: any;
  };
}

export interface AUTH_INIT {
  type: typeof AUTH_INIT;
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
    access: string;
    refresh: string;
    userId: string;
  };
}

export type authDispatchType =
  | authRequest
  | authFailDispatch
  | authSuccessDispatch
  | AUTH_INIT
  | CLEAR_ERROR;
