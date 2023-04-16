import { QuestionType } from "./action";

export const QUESTION_SUCCESS = "QUESTION_SUCCESS";
export const QUESTION_REQUEST = "QUESTION_REQUEST";
export const QUESTION_FAILURE = "QUESTION_FAILURE";
export const QUESTION_UPDATED = "QUESTION_UPDATED";
export const QUESTIONRANDOM_SUCCESS = "QUESTIONRANDOM_SUCCESS";

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

export interface questionUpdated {
  type: typeof QUESTION_UPDATED;
}

export type questionRanDomList = {
  cs?: InterviewQuestionList[];
  situation?: InterviewQuestionList[];
  job?: InterviewQuestionList[];
  personality?: InterviewQuestionList[];
};

export interface questionRanDomDispatch {
  type: typeof QUESTIONRANDOM_SUCCESS;
  payload: {
    randomList: questionRanDomList[];
    qType: QuestionType;
  };
}

export type questionDispatchType =
  | questionRequest
  | questionSuccessDispatch
  | qeestionFailDispatch
  | questionUpdated
  | questionRanDomDispatch
