import { METHOD } from "@/components/test/fecher";
import fetcher from "@/components/test/fecher";
import { Dispatch } from "redux";
import Cookies from "js-cookie";
import {
  boardDispatchType,
  BOARD_REQUEST,
  BOARD_FAILURE,
  BOARD_SUCCESS,
  qnaList,
} from "./types";

export const getBoardDetail =
  (boardId: number) => async (dispatch: Dispatch<boardDispatchType>) => {
    try {
      const response = await fetcher(METHOD.GET, `/board/${boardId}`, {
        headers: { Authorization: Cookies.get("accessToken") },
      });
      if (response) {
        dispatch({
          type: BOARD_SUCCESS,
          payload: {
            list: response.data,
          },
        });
      }
    } catch (error: any) {
      dispatch({
        type: BOARD_FAILURE,
        payload: {
          error,
        },
      });
    }
  };

type Board = {
  title: string;
  content: string;
  essayTitle: string;
  qnaList: qnaList[];
};
export const writeBoard =
  (boardData: Board) => async (dispatch: Dispatch<boardDispatchType>) => {
    try {
      const request = await fetcher(METHOD.POST, "/board/write", boardData, {
        headers: { Authorization: Cookies.get("accessToken") },
      });
    } catch (error: any) {
      dispatch({
        type: BOARD_FAILURE,
        payload: {
          error,
        },
      });
    }
  };
