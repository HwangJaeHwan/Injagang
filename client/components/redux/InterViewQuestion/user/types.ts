import { QuestionType } from "@/types/InterViewQuestion/InterViewQuestionType";

export const SET_TYPE = "SET_TYPE";
export const SET_SELECTED_QUESTIONS = "SET_SELECTED_QUESTIONS";
export const INIT_SELECTED_QUESTIONS = "INIT_SELETED_QUESTIONS";

export interface ISetType {
  type: typeof SET_TYPE;
  payload: {
    selectedType: QuestionType | string;
  };
}

export interface ISetSelectedQuestionList {
  type: typeof SET_SELECTED_QUESTIONS;
  payload: {
    selectedQuestions: string[];
  };
}

export interface InitSelectedQuestionList {
  type: typeof INIT_SELECTED_QUESTIONS;
}

export type userIVQuestionDispatchType =
  | ISetType
  | ISetSelectedQuestionList
  | InitSelectedQuestionList;
