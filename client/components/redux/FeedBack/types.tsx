export const FEEDBACK_SUCCESS = "FEEDBACK_SUCCESS";
export const FEEDBACK_REQUEST = "FEEDBACK_REQUEST";
export const FEEDBACK_FAILURE = "FEEDBACK_FAILURE";

export interface feedBackRequest {
  type: typeof FEEDBACK_REQUEST;
}

export interface feedBackFailDispatch {
  type: typeof FEEDBACK_FAILURE;
  payload: {
    error: any;
  };
}

export type FEEDBACKLIST = {
  feedbackId: number;
  target: string;
  content: string;
  owner: boolean;
};

export interface feedBackSuccessDispatch {
  type: typeof FEEDBACK_SUCCESS;
  payload: {
    list: FEEDBACKLIST[];
  };
}

export interface feedBackFailDispatch {
  type: typeof FEEDBACK_FAILURE;
  payload: {
    error: any;
  };
}

export type feedBackDispatchType =
  | feedBackRequest
  | feedBackFailDispatch
  | feedBackSuccessDispatch;
