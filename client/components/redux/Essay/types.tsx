export const ESSAY_REQUEST = "ESSAY_REQUEST";
export const ESSAY_SUCCESS = "ESSAY_SUCCESS";
export const ESSAY_FAILURE = "ESSAY_FAILURE";
export const ESSAY_READ_SUCCESS = "ESSAY_READ_SUCCESS";
export const ESSAY_UPDATED = "ESSAY_UPDATED";
export const ERROR_CLEAR = "ERROR_CLEAR";

export interface essayRequest {
  type: typeof ESSAY_REQUEST;
}

export type qnaList = {
  qnaId: number;
  question: string;
  answer: string;
};

export type essayState = {
  essayId: number;
  title: string;
  questions: string[];
};

export type readEssayState = {
  essayId: number;
  title: string;
  qnaList: qnaList[];
};

export interface essayUpdatedDispatch {
  type: typeof ESSAY_UPDATED;
}

export interface essayFailDispatch {
  type: typeof ESSAY_FAILURE;
  payload: {
    error: any;
  };
}

export interface essaySuccessDispatch {
  type: typeof ESSAY_SUCCESS;
  payload: {
    list: essayState[];
  };
}

export interface essayReadSuccessDispatch {
  type: typeof ESSAY_READ_SUCCESS;
  payload: {
    readList: readEssayState[];
  };
}

export interface errorClear {
  type: typeof ERROR_CLEAR;
}

export type essayDispatchType =
  | essayRequest
  | essayFailDispatch
  | essaySuccessDispatch
  | essayReadSuccessDispatch
  | essayUpdatedDispatch;
