import { Dispatch } from "redux";
import {
  QUESTIONRANDOM_SUCCESS,
  QUESTION_FAILURE,
  QUESTION_REQUEST,
  QUESTION_SUCCESS,
  QUESTION_UPDATED,
  questionDispatchType,
} from "./types";

import {
  IAddQuestions,
  IDeleteQuestions,
  IRandomQuestions,
  QuestionType,
} from "@/types/InterViewQuestion/InterViewQuestionType";
import {
  addInterViewQuestionAPI,
  deleteInterViewQuestionAPI,
  getInterViewQuestionListAPI,
  getRandomQuestionsAPI,
} from "@/api/INTERVIEWQUESTION/interViewQuestionAPI";

export const handleAddQuestion =
  (newList: IAddQuestions, type: QuestionType | string) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      if (newList.questionType === "ALL") {
        newList.questionType = "";
      }
      dispatch({ type: QUESTION_REQUEST });
      const request = await addInterViewQuestionAPI(newList);
      if (request.status === 200) {
        dispatch({ type: QUESTION_UPDATED });
        dispatch(getInterViewQnaList(type));
      }
    } catch (error: any) {
      dispatch({
        type: QUESTION_FAILURE,
        payload: {
          error,
        },
      });
    }
  };

export const getInterViewQnaList =
  (type: QuestionType | string) =>
  async (dispatch: Dispatch<questionDispatchType>): Promise<void> => {
    try {
      // TODO : 처리 방식에 대해서 고려해야함.
      if (type === "ALL") {
        type = "";
      }
      dispatch({ type: QUESTION_REQUEST });
      const response = await getInterViewQuestionListAPI(type);
      if (response) {
        dispatch({
          type: QUESTION_SUCCESS,
          payload: {
            list: response.data,
          },
        });
      }
    } catch (error: any) {
      dispatch({
        type: QUESTION_FAILURE,
        payload: {
          error,
        },
      });
    }
  };

export const handleDeleteInterViewQnaList =
  (ids: IDeleteQuestions, type: QuestionType | string) =>
  async (dispatch: Dispatch<questionDispatchType>): Promise<void> => {
    try {
      const request = await deleteInterViewQuestionAPI(ids);
      if (request.status === 200) {
        dispatch({ type: QUESTION_UPDATED });
        dispatch(getInterViewQnaList(type));
      }
    } catch (error: any) {
      dispatch({
        type: QUESTION_FAILURE,
        payload: {
          error,
        },
      });
    }
  };

export const getRandomList =
  (randomSet: IRandomQuestions[]) =>
  async (dispatch: Dispatch<questionDispatchType>): Promise<void> => {
    try {
      const response = await getRandomQuestionsAPI(randomSet);
      if (response) {
        dispatch({
          type: QUESTIONRANDOM_SUCCESS,
          payload: {
            randomList: response.data,
          },
        });
      }
    } catch (error: any) {
      dispatch({
        type: QUESTION_FAILURE,
        payload: {
          error,
        },
      });
    }
  };
