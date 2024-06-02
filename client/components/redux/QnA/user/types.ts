import { CorrectionItem } from "@/components/QNA/Answer/AnswerLayout";

export const SET_CORRECTION = "SET_CORRECTION";
export const INIT_CORRECITON = "INIT_CORRECTION";
export const SET_TARGETFEED = "SET_TARGETFEED";
export const INIT_TARGETFEED = "INIT_TARGETFEED";

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

export interface InitTargetFeed {
  type: typeof INIT_TARGETFEED;
}

export type userBoardDispatchType =
  | IsetCorrection
  | InitCorrection
  | IsetTargetFeed
  | InitTargetFeed;
