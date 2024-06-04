import { QuestionType } from "@/types/InterViewQuestion/InterViewQuestionType";
import {
  INIT_SELECTED_QUESTIONS,
  SET_SELECTED_QUESTIONS,
  SET_TYPE,
} from "./types";

export const setTypeAction = (type: QuestionType | string) => ({
  type: SET_TYPE,
  payload: { selectedType: type },
});

export const setSelectedQuestionsAction = (list: string[]) => ({
  type: SET_SELECTED_QUESTIONS,
  payload: { selectedQuestions: list },
});

export const clearSelectedQuestion = () => ({
  type: INIT_SELECTED_QUESTIONS,
});
