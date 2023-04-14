import { METHOD } from "@/components/test/fecher";
import fetcher from "@/components/test/fecher";
import { Dispatch } from "redux";
import Cookies from "js-cookie";
import {
  boardDispatchType,
  BOARD_REQUEST,
  BOARD_FAILURE,
  BOARD_SUCCESS,
  BOARDINFO_SUCCESS,
  qnaList,
} from "./types";

export const getBoardDetail =
  (boardId: number) => async (dispatch: Dispatch<boardDispatchType>) => {
    try {
      dispatch({ type: BOARD_REQUEST });
      const response = await fetcher(METHOD.GET, `/board/${boardId}`, {
        headers: { Authorization: Cookies.get("accessToken") },
      });
      if (response) {
        dispatch({
          type: BOARD_SUCCESS,
          payload: {
            list: [response.data],
            qnaIdList: response.data.qnaList,
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
  essayId: number;
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

export const deleteBoard = (boardId: number) => async (dispatch: Dispatch) => {
  try {
    const request = await fetcher(METHOD.DELETE, `/board/${boardId}`, {
      headers: {
        Authorization: Cookies.get("accessToken"),
      },
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

type ChangeData = {
  boardId: number;
  changeTitle: string;
  changeContent: string;
};
export const updateBoard =
  (changeData: ChangeData) => async (dispatch: Dispatch) => {
    try {
      const request = await fetcher(METHOD.PATCH, "/board/revise", changeData, {
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

export const getBoardList = (page: number) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: BOARD_REQUEST });
    const response = await fetcher(METHOD.GET, `/board?page=${page}`);
    if (response) {
      dispatch({
        type: BOARDINFO_SUCCESS,
        payload: {
          boardInfoList: [response.data],
        },
      });
    }
  } catch (error: any) {
    dispatch({ type: BOARD_FAILURE, payload: { error } });
  }
};
