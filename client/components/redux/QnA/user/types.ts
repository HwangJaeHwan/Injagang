export const SET_CORRECTION = "SET_CORRECTION";

export interface IsetCorrection {
  type: typeof SET_CORRECTION;
  payload: {
    selectedCorrection: string | null;
  };
}

export type userBoardDispatchType = IsetCorrection;
