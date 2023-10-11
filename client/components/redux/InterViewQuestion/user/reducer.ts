import { QuestionType } from "@/types/InterViewQuestion/InterViewQuestionType";
import {
  SET_SELECTED_QUESTIONS,
  SET_TYPE,
  userIVQuestionDispatchType,
} from "./types";

interface InitialState {
  selectedType: QuestionType | string;
  selectedQuestions: string[];
}

const initialState: InitialState = {
  selectedQuestions: [],
  selectedType: "all",
};

const userInterViewQuestionsReducer = (
  state = initialState,
  action: userIVQuestionDispatchType,
) => {
  switch (action.type) {
    case SET_SELECTED_QUESTIONS:
      return {
        ...state,
        selectedQuestions: action.payload.selectedQuestions,
      };

    case SET_TYPE:
      return {
        ...state,
        selectedType: action.payload.selectedType,
      };
    default:
      return state;
  }
};

export default userInterViewQuestionsReducer;
