import {
  userTemplateDispatchType,
  SET_CUR_TEMPLATE_LIST,
  ADD_TEMPLAETE_TOGGLE,
} from "./types";

interface InitiaState {
  selectedTemplateList: string[];
  isAddTemplate: boolean;
}

const initialState: InitiaState = {
  selectedTemplateList: [],
  isAddTemplate: false,
};

const userTemplateReducer = (
  state = initialState,
  action: userTemplateDispatchType,
) => {
  switch (action.type) {
    case SET_CUR_TEMPLATE_LIST:
      return {
        ...state,
        selectedTemplateList: action.payload,
      };

    case ADD_TEMPLAETE_TOGGLE:
      return {
        ...state,
        isAddTemplate: !state.isAddTemplate,
      };

    default:
      return state;
  }
};

export default userTemplateReducer;
