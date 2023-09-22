import { IEssayList, IGetEssayList } from "@/types/essay/EssayType";

export const SET_CUR_ESSAY_LIST = "SET_CUR_ESSAY_LIST";

export interface IsetCurEssayList {
  type: typeof SET_CUR_ESSAY_LIST;
  payload: {
    selectedEssayList: IEssayList;
  };
}


export type userEssayDispatchType = IsetCurEssayList 
