export const BOARD_SUCCESS = "BOARD_SUCCESS";
export const BOARD_REQUEST = "BOARD_REQUEST";
export const BOARD_FAILURE = "BOARD_FAILURE";

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
  question: string;
  answer: string;
};

export interface BOARDLIST {
  boardId: number;
  title: string;
  content: string;
  essayTitle: string;
  qnaList: qnaList[];
}

export interface boardSuccessDispatch {
  type: typeof BOARD_SUCCESS;
  payload: {
    list: BOARDLIST[];
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
  | boardSuccessDispatch;
