import { QuestionType } from "@/types/InterViewQuestion/InterViewQuestionType";
import { SET_SELECTED_QUESTIONS, SET_TYPE } from "./types";

export const setTypeAction = (type: QuestionType | string) => ({
  type: SET_TYPE,
  payload: { selectedType: type },
});

export const setSelectedQuestionsAction = (list: string[]) => ({
  type: SET_SELECTED_QUESTIONS,
  payload: { selectedQuestions: list },
});
 