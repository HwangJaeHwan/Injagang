import { SET_CORRECTION } from "./types";

export const changeCorrection = (correction: string) => ({
  type: SET_CORRECTION,
  payload: { selectedCorrection: correction },
});
