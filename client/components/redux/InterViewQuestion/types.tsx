export const QUESTION_SUCCESS = "QUESTION_SUCCESS";
export const QUESTION_REQUEST = "QUESTION_REQUEST";
export const QUESTION_FAILURE = "QUESTION_FAILURE";

export interface questionRequest {
  type: typeof QUESTION_REQUEST;
}

export interface qeestionFailDispatch {
  type: typeof QUESTION_FAILURE;
  payload: {
    error: any;
  };
}

export type InterviewQuestionList = {
  id: number;
  questions: string;
};

export interface questionSuccessDispatch {
  type: typeof QUESTION_SUCCESS;
  payload: {
    list: InterviewQuestionList[];
  };
}

export type questionDispatchType =
  | questionRequest
  | questionSuccessDispatch
  | qeestionFailDispatch;
