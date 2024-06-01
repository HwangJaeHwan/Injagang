import { SET_CUR_ESSAY_LIST } from "./types";
import { IGetEssayList } from "@/types/essay/EssayType";

export const setCurEssayList = (essayList: IGetEssayList) => ({
  type: SET_CUR_ESSAY_LIST,
  payload: { selectedEssayList: essayList },
});
