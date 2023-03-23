export const ESSAY_REQUEST = "ESSAY_REQUEST";
export const ESSAY_SUCCESS = "ESSAY_SUCCESS";
export const ESSAY_FAILURE = "ESSAY_FAILURE";
export const ERROR_CLEAR = "ERROR_CLEAR";

export interface essayRequest {
  type: typeof ESSAY_REQUEST;
}

export type qnaList = {
  question: string;
  answer: string;
};

export type essayState = {
  essayId: number;
  title: string;
  qnaList: qnaList[];
};

export interface essayFailDispatch {
  type: typeof ESSAY_FAILURE;
  payload: {
    error: any;
  };
}

export interface essaySuccessDispatch {
  type: typeof ESSAY_SUCCESS;
  payload: {
    essayState: essayState[];
  };
}

export interface errorClear {
  type: typeof ERROR_CLEAR;
}

export type essayDispatchType =
  | essayRequest
  | essayFailDispatch
  | essaySuccessDispatch;
