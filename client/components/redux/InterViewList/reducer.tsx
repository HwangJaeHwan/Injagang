import { ADD_INTERVIEWLIST, userInterViewListType } from "./types";

export interface InitiaState {
  interViewList: string[];
}

const InitiaState:InitiaState = {
  interViewList: [],
};

const userInterViewListReducer = (
  state= InitiaState,
  action: userInterViewListType,
) => {
  switch (action.type) {
    case ADD_INTERVIEWLIST:
      return {
        ...state,
        interViewList: action.payload.interViewList,
      };

    default:
      return state;
  }
};

export default userInterViewListReducer;
