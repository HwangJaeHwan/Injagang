import { BOARD_APIS } from "../config";
import { fetcher, METHOD } from "../client";
import { IReviseQnaBoard, IWriteQnaBoard } from "@/types/qnaBoard/QnaBoardType";

export const getQnaBoardListAPI = async (queryString: number) => {
  return fetcher(METHOD.GET, `${BOARD_APIS.GET_API}?page=${queryString}`);
};

export const getDetailBoardAPI = async (targetId: number) => {
  return fetcher(METHOD.GET, `${BOARD_APIS.READ_API}${targetId}`);
};

export const writeQnaBoardAPI = async (boardPayload: IWriteQnaBoard) => {
  return fetcher(METHOD.POST, BOARD_APIS.WRITE_API, boardPayload);
};

export const deleteQnaBoardAPI = async (targetId: number) => {
  return fetcher(METHOD.DELETE, `${BOARD_APIS.DELETE_API}${targetId}`);
};

export const reviseQnaBoardAPI = async (boardPayload: IReviseQnaBoard) => {
  return fetcher(METHOD.PATCH, BOARD_APIS.REVISE_API, boardPayload);
};
