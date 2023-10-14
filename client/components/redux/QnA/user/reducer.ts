import { IsetCorrection, userBoardDispatchType, SET_CORRECTION } from "./types";

export interface InitialState {
  selectedCorrection: string | null;
}

const initialState: InitialState = {
  selectedCorrection: null,
};

const userBoardReducer = (
  state = initialState,
  action: userBoardDispatchType,
): InitialState => {
  switch (action.type) {
    case SET_CORRECTION:
      return {
        ...state,
        selectedCorrection: action.payload.selectedCorrection,
      };
    default:
      return state;
  }
};

export default userBoardReducer;
