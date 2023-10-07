import { IToast } from "@/hooks/useToast";

export const SHOW_TOAST = "SHOW_TOAST";
export const HIDE_TOAST = "HIDE_TOAST";

export interface SHOW_TOAST {
  type: typeof SHOW_TOAST;
  payload: {
    toastList: IToast;
  };
}

export interface HIDE_TOAST {
  type: typeof HIDE_TOAST;
  payload: {
    id: string;
  };
}

export type toastDispatchType = SHOW_TOAST | HIDE_TOAST;
