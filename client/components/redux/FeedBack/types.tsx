export const FEEDBACK_SUCCESS = "FEEDBACK_SUCCESS";
export const FEEDBACK_REQUEST = "FEEDBACK_REQUEST";
export const FEEDBACK_FAILURE = "FEEDBACK_FAILURE";
export const FEEDBACK_UPDATED = "FEEDBACK_UPDATED";

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

export interface feedBackUpdatedDispatch {
  type: typeof FEEDBACK_UPDATED;
}

export type feedBackDispatchType =
  | feedBackRequest
  | feedBackFailDispatch
  | feedBackSuccessDispatch
  | feedBackUpdatedDispatch;
