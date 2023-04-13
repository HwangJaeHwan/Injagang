import { Dispatch } from "react";
import {
  InterviewQuestionList,
  QUESTION_FAILURE,
  QUESTION_REQUEST,
  QUESTION_SUCCESS,
  questionDispatchType,
} from "./types";
import fetcher, { METHOD } from "@/components/test/fecher";
import Cookies from "js-cookie";

type AddQuestionData = {
  questions: string[];
  questionType: QuestionType | string;
};

export const handleAddQuestion =
  (newList: AddQuestionData) =>
  async (dispatch: Dispatch<questionDispatchType>): Promise<void> => {
    try {
      if (newList.questionType === "ALL") {
        newList.questionType = "";
      }
      dispatch({ type: QUESTION_REQUEST });
      const request = await fetcher(METHOD.POST, "questions/add", newList, {
        headers: {
          Authorization: Cookies.get("accessToken"),
        },
      });
    } catch (error: any) {
      dispatch({
        type: QUESTION_FAILURE,
        payload: {
          error,
        },
      });
    }
  };

export enum QuestionType {
  CS = "CS",
  SITUATION = "SITUATION",
  JOB = "JOB",
  PERSONALITY = "PERSONALITY",
  ALL = "ALL",
}

export const getInterViewQnaList =
  (type: QuestionType | string) =>
  async (dispatch: Dispatch<questionDispatchType>): Promise<void> => {
    try {
      if (type === "ALL") {
        type = "";
      }
      dispatch({ type: QUESTION_REQUEST });
      const response = await fetcher(
        METHOD.GET,
        `/questions?questionType=${type}`,
      );
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
  () =>
  async (dispatch: Dispatch<questionDispatchType>): Promise<void> => {
    try {
      dispatch({ type: QUESTION_REQUEST });
      const request = await fetcher(METHOD.DELETE, "/questions", {
        headers: {
          Authorization: Cookies.get("accessToken"),
        },
      });
    } catch (error: any) {
      dispatch({
        type: QUESTION_FAILURE,
        payload: {
          error,
        },
      });
    }
  };
