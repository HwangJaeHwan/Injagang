import { CorrectionItem } from "@/components/QNA/Answer/AnswerLayout";

import { INIT_CORRECITON, SET_CORRECTION, SET_TARGETFEED } from "./types";

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
