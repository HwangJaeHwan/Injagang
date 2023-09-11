import { QUESTIONS_APIS } from "../config";
import { fetcher, METHOD } from "../client";
import {
  IAddQuestions,
  IDeleteQuestions,
  IRandomQuestions,
  QuestionType,
} from "@/types/InterViewQuestion/InterViewQuestionType";

//FIXME : 잘못된 예외처리 사용중 수정해야함
export const getInterViewQuestionListAPI = async (
  queryString: QuestionType | string,
) => {
  return fetcher(
    METHOD.GET,
    `${QUESTIONS_APIS.GET_API}?questionType=${queryString}`,
  );
};

export const addInterViewQuestionAPI = async (
  questionPayload: IAddQuestions,
) => {
  return fetcher(METHOD.POST, QUESTIONS_APIS.ADD_API, questionPayload);
};

export const deleteInterViewQuestionAPI = async (
  questionPayload: IDeleteQuestions,
) => {
  return fetcher(METHOD.DELETE, QUESTIONS_APIS.DELETE_API, {
    data: questionPayload,
  });
};

export const getRandomQuestionsAPI = async (
  randomPayload: IRandomQuestions[],
) => {
  return fetcher(METHOD.POST, QUESTIONS_APIS.RANDOM_API, randomPayload);
};
