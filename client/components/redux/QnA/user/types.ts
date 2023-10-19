import { CorrectionItem } from "@/components/QNA/Answer/AnswerLayout";

export const SET_CORRECTION = "SET_CORRECTION";
export const INIT_CORRECITON = "INIT_CORRECTION";
export const SET_TARGETFEED = "SET_TARGETFEED";

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

export type userBoardDispatchType =
  | IsetCorrection
  | InitCorrection
  | IsetTargetFeed;
