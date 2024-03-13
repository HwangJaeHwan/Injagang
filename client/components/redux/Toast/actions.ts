import { Dispatch } from "redux";

import { v4 as uuid4 } from "uuid";

import { HIDE_TOAST, SHOW_TOAST } from "./types";

import { TOAST_MODE } from "@/hooks/useToast";

export const showToastAction =
  (mode: TOAST_MODE = "Info", message: string, duration: number = 3000) =>
  (dispatch: Dispatch) => {
    const id = uuid4();
    const startTime = Date.now();
    dispatch({
      type: SHOW_TOAST,
      payload: {
        toastList: { id, message, mode, duration, startTime },
      },
    });
    setTimeout(() => {
        dispatch(hideToastAction(id));
    }, duration);
  };

export const hideToastAction = (id: string) => ({
  type: HIDE_TOAST,
  payload: {
    id,
  },
});
