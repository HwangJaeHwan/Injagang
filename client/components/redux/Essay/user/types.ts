import { IGetEssayList } from "@/types/essay/EssayType";

export const SET_CUR_ESSAY_LIST = "SET_CUR_ESSAY_LIST";

export interface IsetCurEssayList {
  type: typeof SET_CUR_ESSAY_LIST;
  payload: {
    selectedEssayList: IGetEssayList;
  };
}

export type userEssayDispatchType = IsetCurEssayList;
