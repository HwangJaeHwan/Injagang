import { HIDE_TOAST, SHOW_TOAST, toastDispatchType } from "./types";

import { IToast } from "@/hooks/useToast";


interface InitialState {
  toastList: IToast[];
}

const initialState: InitialState = {
  toastList: [],
};

const toastReducer = (
  state = initialState,
  action: toastDispatchType,
): InitialState => {
  switch (action.type) {
    case SHOW_TOAST:
      return {
        ...state,
        toastList: [...state.toastList, action.payload.toastList],
      };

    case HIDE_TOAST:
      return {
        ...state,
        toastList: state.toastList.filter(
          toast => toast.id !== action.payload.id,
        ),
      };

    default:
      return state;
  }
};

export default toastReducer;
