import { CLEAR_ERROR, SET_ERROR, errorDispatchType } from "./types";

interface initialState {
  error: Error | null;
}

const initialState: initialState = {
  error: null,
};

const errorReducer = (state = initialState, action: errorDispatchType) => {
  switch (action.type) {
    case SET_ERROR:
      return { ...state, error: action.payload.error };
    case CLEAR_ERROR: {
      return { ...state, error: null };
    }
    default:
      return state;
  }
};

export default errorReducer;
