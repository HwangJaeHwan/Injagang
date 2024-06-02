import { IGetTemplate } from "@/types/template/TemplateType";
import {
  userTemplateDispatchType,
  SET_CUR_TEMPLATE_LIST,
  ADD_TEMPLATE_TOGGLE,
  INIT_CUR_TEMPLATE_LIST,
} from "./types";

interface InitiaState {
  isAddTemplate: boolean;
  selectedTemplateList: IGetTemplate;
}

const initialState: InitiaState = {
  isAddTemplate: false,
  selectedTemplateList: {
    templateId: 0,
    title: "",
    questions: [],
  },
};

const userTemplateReducer = (
  state = initialState,
  action: userTemplateDispatchType,
): InitiaState => {
  switch (action.type) {
    case SET_CUR_TEMPLATE_LIST:
      return {
        ...state,
        selectedTemplateList: action.payload.selectedTemplateList,
      };

    case ADD_TEMPLATE_TOGGLE:
      return {
        ...state,
        isAddTemplate: action.payload.isAddTemplate,
      };
    case INIT_CUR_TEMPLATE_LIST:
      return {
        ...state,
        selectedTemplateList: initialState.selectedTemplateList,
      };
    default:
      return state;
  }
};
export default userTemplateReducer;
