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
} from "./types";

interface EssayList {
  title: string;
  qnaList: qnaList[];
}

const headers = {
  Authorization: Cookies.get("accessToken"),
};

/**자소서 추가 요청후 반영된 자소서 요청  */
export const addEssay =
  (essayData: EssayList, userId: number) =>
  async (dispatch: Dispatch<essayDispatchType>): Promise<void> => {
    try {
      dispatch({ type: ESSAY_REQUEST });
      const request = await fetcher(METHOD.POST, "/essay/write", essayData, {
        headers,
      });
      // const response = await fetcher(METHOD.GET, `/essay/${userId}`, {
      //   headers,
      // });
      // if (response) {
      //   dispatch({
      //     type: ESSAY_SUCCESS,
      //     payload: {
      //       list: response.data,
      //     },
      //   });
      // }
    } catch (error: any) {
      dispatch({
        type: ESSAY_FAILURE,
        payload: {
          error,
        },
      });
    }
  };

/**자소서리스트 요청*/
export const getEssayList =
  (userId: number) =>
  async (dispatch: Dispatch<essayDispatchType>): Promise<void> => {
    try {
      dispatch({ type: ESSAY_REQUEST });
      const response = await fetcher(METHOD.GET, `/essay/${userId}`, {
        headers,
      });
      if (response) {
        dispatch(
          {
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
