import { IGetEssayList } from "@/types/essay/EssayType";

export const SET_CUR_ESSAY_LIST = "SET_CUR_ESSAY_LIST";
export const INIT_CUR_ESSAY = "INIT_CUR_ESSAY";

export interface IsetCurEssayList {
  type: typeof SET_CUR_ESSAY_LIST;
  payload: {
    selectedEssayList: IGetEssayList;
  };
}

export interface InitCurEssayList {
  type: typeof INIT_CUR_ESSAY;
}

export type userEssayDispatchType = IsetCurEssayList | InitCurEssayList;
