export const ADD_INTERVIEWLIST = "ADD_INTERVIEWLIST";

export interface addInterViewList {
  type: typeof ADD_INTERVIEWLIST;
  payload: {
    interViewList: string[]
  };
}

export type userInterViewListType = addInterViewList;
