import { IGetTemplate } from "@/types/template/TemplateType";
import {
  TEMPLATE_REQUEST,
  TEMPLATE_FAILURE,
  TEMPLATE_SUCCESS,
  templateDispatchType,
} from "./types";

export interface InitiaState {
  loading: boolean;
  error: null;
  templateList: IGetTemplate[];
}

const initialState: InitiaState = {
  loading: false,
  error: null,
  templateList: [
    {
      templateId: 0,
      title: "",
      questions: [],
    },
  ],
};

const templateReducer = (
  state = initialState,
  action: templateDispatchType,
) => {
  switch (action.type) {
    case TEMPLATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TEMPLATE_SUCCESS:
      return {
        ...state,
        loading: false,
        templateList: action.payload.templateState.map(it => ({
          templateId: it.templateId,
          title: it.title,
          questions: it.questions,
        })),
      };
    case TEMPLATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export default templateReducer;
