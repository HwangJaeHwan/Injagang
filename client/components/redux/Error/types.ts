export const SET_ERROR = "SET_ERROR";
export const CLEAR_ERROR = "CLEAR_ERROR";

export interface SET_ERROR {
  type: typeof SET_ERROR;
  payload: {
    error: Error;
  };
}

export interface CLEAR_ERROR {
  type: typeof CLEAR_ERROR;
}

export type errorDispatchType = SET_ERROR | CLEAR_ERROR;
