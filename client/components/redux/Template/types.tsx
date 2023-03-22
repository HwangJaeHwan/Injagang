export const TEMPLATE_REQUEST = "TEMPLATE_REQUEST";
export const TEMPLATE_SUCCESS = "TEMPLATE_SUCCESS";
export const TEMPLATE_FAILURE = "TEMPLATE_FAILURE";

export interface templateRequest {
  type: typeof TEMPLATE_REQUEST;
}

export type TemplateState = {
  templateId: number;
  title: string;
  questions?: string[];
  qnaList?: string[];
};

export interface templateFailDispatch {
  type: typeof TEMPLATE_FAILURE;
  payload: {
    error: any;
  };
}

export interface templateSuccessDispatch {
  type: typeof TEMPLATE_SUCCESS;
  payload: {
    templateState: TemplateState[];
  };
}

export type templateDispatchType =
  | templateRequest
  | templateFailDispatch
  | templateSuccessDispatch;
