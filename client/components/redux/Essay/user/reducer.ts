import { userEssayDispatchType, SET_CUR_ESSAY_LIST } from "./types";
import { IEssayList } from "@/types/essay/EssayType";

interface InitiaState {
  selectedEssayList: IEssayList;
}

const initialState: InitiaState = {
  selectedEssayList: {
    essyId: 0,
    title: "",
    owner: false,
    qnaList: [],
  },
};

const userEssayReducer = (
  state = initialState,
  action: userEssayDispatchType,
): InitiaState => {
  switch (action.type) {
    case SET_CUR_ESSAY_LIST:
      return {
        ...state,
        selectedEssayList: action.payload.selectedEssayList,
      };
    default:
      return state;
  }
};
export default userEssayReducer;
