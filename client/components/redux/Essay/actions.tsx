import { METHOD } from "@/components/test/fecher";
import fetcher from "@/components/test/fecher";
import { Dispatch } from "redux";
import Cookies from "js-cookie";
import {
  ESSAY_REQUEST,
  ESSAY_FAILURE,
  ESSAY_SUCCESS,
  essayDispatchType,
  errorClear,
  qnaList,
  ESSAY_READ_SUCCESS,
} from "./types";

interface EssayList {
  title: string;
  qnaList: qnaList[];
}

/**자소서 추가 요청후 반영된 자소서 요청API */
export const addEssay =
  (essayData: EssayList, userId: number) =>
  async (dispatch: Dispatch<essayDispatchType>): Promise<void> => {
    try {
      dispatch({ type: ESSAY_REQUEST });
      const request = await fetcher(METHOD.POST, "/essay/write", essayData, {
        headers: { Authorization: Cookies.get("accessToken") },
      });
    } catch (error: any) {
      dispatch({
        type: ESSAY_FAILURE,
        payload: {
          error,
        },
      });
    }
  };

export const updateEssay =
  (modifiedEssayData: EssayList, essayId: number) =>
  async (dispatch: Dispatch<essayDispatchType>): Promise<void> => {
    try {
      const request = await fetcher(
        METHOD.PATCH,
        `essay/revise/${essayId}`,
        modifiedEssayData,
        {
          headers: { Authorization: Cookies.get("accessToken") },
        },
      );
    } catch (error: any) {
      dispatch({
        type: ESSAY_FAILURE,
        payload: {
          error,
        },
      });
    }
  };

/**자소서리스트 요청API*/
export const getEssayList =
  (userId: number) =>
  async (dispatch: Dispatch<essayDispatchType>): Promise<void> => {
    try {
      dispatch({ type: ESSAY_REQUEST });
      const response = await fetcher(METHOD.GET, `/essay/${userId}`, {
        headers: { Authorization: Cookies.get("accessToken") },
      });
      if (response) {
        dispatch({
          type: ESSAY_SUCCESS,
          payload: {
            list: response.data,
          },
        });
      }
    } catch (error: any) {
      dispatch({
        type: ESSAY_FAILURE,
        payload: {
          error,
        },
      });
    }
  };

/**자소서 세부내용 읽기요청 API */
export const readEssayList =
  (essayId: number) =>
  async (dispatch: Dispatch<essayDispatchType>): Promise<void> => {
    try {
      dispatch({ type: ESSAY_REQUEST });
      const response = await fetcher(METHOD.GET, `/essay/read/${essayId}`, {
        headers: { Authorization: Cookies.get("accessToken") },
      });
      if (response) {
        dispatch({
          type: ESSAY_READ_SUCCESS,
          payload: {
            readList: [response.data],
          },
        });
      }
    } catch (error: any) {
      dispatch({
        type: ESSAY_FAILURE,
        payload: {
          error,
        },
      });
    }
  };
