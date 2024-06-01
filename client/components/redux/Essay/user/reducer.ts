import { userEssayDispatchType, SET_CUR_ESSAY_LIST } from "./types";
import { IGetEssayList } from "@/types/essay/EssayType";

interface InitiaState {
  selectedEssayList: IGetEssayList;
}

const initialState: InitiaState = {
  selectedEssayList: {
    essayId: 0,
    title: "",
    owner: false,
    questions: [],
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
