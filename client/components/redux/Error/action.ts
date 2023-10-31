import { CLEAR_ERROR, SET_ERROR } from "./types";

export const setErrorAction = (error: Error) => ({
  type: SET_ERROR,
  payload: {
    error,
  },
});

export const clearErrorAction = () => ({
  type: CLEAR_ERROR,
});
