import { QuestionType } from "@/types/InterViewQuestion/InterViewQuestionType";

export const SET_TYPE = "SET_TYPE";
export const SET_SELECTED_QUESTIONS = "SET_SELECTED_QUESTIONS";

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

export type userIVQuestionDispatchType =
  | ISetType
  | ISetSelectedQuestionList;
