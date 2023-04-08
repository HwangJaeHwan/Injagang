export const BOARD_SUCCESS = "BOARD_SUCCESS";
export const BOARD_REQUEST = "BOARD_REQUEST";
export const BOARD_FAILURE = "BOARD_FAILURE";
export const BOARDINFO_SUCCESS = "BOARDINFO_SUCCESS";

export interface boardRequest {
  type: typeof BOARD_REQUEST;
}

export interface boardFailDispatch {
  type: typeof BOARD_FAILURE;
  payload: {
    error: any;
  };
}

export type qnaList = {
  qnaId: number;
  question: string;
  answer: string;
};

export interface BOARDLIST {
  boardId: number;
  title: string;
  content: string;
  userId: number;
  nickname: string;
  owner: boolean;
  essayTitle: string;
  qnaList: qnaList[];
}

export type BOARDITEMINFOLIST = {
  id: number;
  title: string;
  nickname: string;
};

export interface BOARDINFOLIST {
  totalPage: number;
  boardInfos: BOARDITEMINFOLIST[];
  isFirst: Boolean;
  isLast: Boolean;
}

export interface boardSuccessDispatch {
  type: typeof BOARD_SUCCESS;
  payload: {
    list: BOARDLIST[];
    qnaIdList: qnaList[];
  };
}

export interface boardInfoSuccessDispatch {
  type: typeof BOARDINFO_SUCCESS;
  payload: {
    boardInfoList: BOARDINFOLIST[];
  };
}

export interface boardFailDispatch {
  type: typeof BOARD_FAILURE;
  payload: {
    error: any;
  };
}

export type boardDispatchType =
  | boardRequest
  | boardFailDispatch
  | boardInfoSuccessDispatch
  | boardSuccessDispatch;
