import { CorrectionItem } from "@/components/QNA/Answer/AnswerLayout";

export const SET_CORRECTION = "SET_CORRECTION";
export const INIT_CORRECITON = "INIT_CORRECTION";
export const SET_TARGETFEED = "SET_TARGETFEED";
export const SET_BOARDSEARCH = "SET_BOARDSEARCH";
export const SET_BOARDTYPE = "SET_BOARDTYPE";
export const INIT_TARGETFEED = "INIT_TARGETFEED";
export const INIT_BOARDSEARCH = "INIT_BOARDSEARCH";


export interface IsetCorrection {
  type: typeof SET_CORRECTION;
  payload: {
    selectedCorrection: CorrectionItem;
  };
}

export interface InitCorrection {
  type: typeof INIT_CORRECITON;
}

export interface IsetTargetFeed {
  type: typeof SET_TARGETFEED;
  payload: {
    targetFeed: number;
  };
}


export interface IsetBoardSearch {
  type: typeof SET_BOARDSEARCH;
  payload: {
    boardSearch: string;
  }
}

export interface IsetBoardType {
  type: typeof SET_BOARDTYPE;
  payload: {
    boardType: string;
  }
}


export interface InitTargetFeed {
  type: typeof INIT_TARGETFEED;
}

export interface InitBoardSearch {
  type: typeof INIT_BOARDSEARCH
}


export type userBoardDispatchType =
  | IsetCorrection
  | InitCorrection
  | IsetTargetFeed
  | InitTargetFeed
  | IsetBoardSearch
  | IsetBoardType
  | InitBoardSearch
  ;
