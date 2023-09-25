import { IGetTemplate } from "@/types/template/TemplateType";

export const TEMPLATE_REQUEST = "TEMPLATE_REQUEST";
export const TEMPLATE_SUCCESS = "TEMPLATE_SUCCESS";
export const TEMPLATE_FAILURE = "TEMPLATE_FAILURE";

export interface templateRequest {
  type: typeof TEMPLATE_REQUEST;
}

export interface templateFailDispatch {
  type: typeof TEMPLATE_FAILURE;
  payload: {
    error: any;
  };
}

export interface templateSuccessDispatch {
  type: typeof TEMPLATE_SUCCESS;
  payload: {
    templateState: IGetTemplate[];
  };
}

export type templateDispatchType =
  | templateRequest
  | templateFailDispatch
  | templateSuccessDispatch;
