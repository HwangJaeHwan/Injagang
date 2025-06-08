import { CorrectionItem } from "@/components/QNA/Answer/AnswerLayout";

import {
  INIT_BOARDSEARCH,
  INIT_CORRECITON,
  INIT_TARGETFEED,
  SET_BOARDSEARCH,
  SET_BOARDTYPE,
  SET_CORRECTION,
  SET_TARGETFEED,
} from "./types";

export const changeCorrection = (correction: CorrectionItem) => ({
  type: SET_CORRECTION,
  payload: { selectedCorrection: correction },
});

export const initCorrection = () => ({
  type: INIT_CORRECITON,
});

export const changeTargetFeed = (targetFeed: number) => ({
  type: SET_TARGETFEED,
  payload: { targetFeed },
});

export const changeBoardSearch = (boardSearch: string) => ({
  type: SET_BOARDSEARCH,
  payload: { boardSearch },
});

export const changeBoardType = (boardType: string) => ({
  type: SET_BOARDTYPE,
  payload: { boardType },
});

export const initTargetFeed = () => ({
  type: INIT_TARGETFEED,
});

export const initBoardSearch = () => ({ type: INIT_BOARDSEARCH });
