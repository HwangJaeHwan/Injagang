import {
  IEssayList,
  IGetEssayList,
} from "@/types/essay/EssayType";

export const ESSAY_REQUEST = "ESSAY_REQUEST";
export const ESSAY_SUCCESS = "ESSAY_SUCCESS";
export const ESSAY_FAILURE = "ESSAY_FAILURE";
export const ESSAY_UPDATED = "ESSAY_UPDATED";
export const ESSAY_READ_SUCCESS = "ESSAY_READ_SUCCESS";
export const ERROR_CLEAR = "ERROR_CLEAR";
export const CLEAR_READ_ESSAY = 'CLEAR_READ_ESSAY'

export interface essayRequest {
  type: typeof ESSAY_REQUEST;
}

export interface essayUpdatedDispatch {
  type: typeof ESSAY_UPDATED;
}

export interface essayFailDispatch {
  type: typeof ESSAY_FAILURE;
  payload: {
    error: any;
  };
}

export interface essayReadSuccessDispatch {
  type: typeof ESSAY_READ_SUCCESS;
  payload: {
    readList: IEssayList[];
  };
}

export interface essaySuccessDispatch {
  type: typeof ESSAY_SUCCESS;
  payload: {
    essayList: IGetEssayList[];
  };
}

export interface errorClear {
  type: typeof ERROR_CLEAR;
}

export interface clearReadEssay {
  type: typeof CLEAR_READ_ESSAY;
}

export type essayDispatchType =
  | essayRequest
  | essayFailDispatch
  | essaySuccessDispatch
  | essayUpdatedDispatch
  | essayReadSuccessDispatch
  | clearReadEssay;
