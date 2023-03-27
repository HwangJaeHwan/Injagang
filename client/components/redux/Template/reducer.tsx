import {
  TEMPLATE_REQUEST,
  TEMPLATE_FAILURE,
  TEMPLATE_SUCCESS,
  templateDispatchType,
  TemplateState,
} from "./types";

export interface InitiaState {
  loading: boolean;
  error: null;
  templateList: TemplateState[];
}

const initialState: InitiaState = {
  loading: false,
  error: null,
  templateList: [
    {
      templateId: 0,
      title: "",
      questions: [],
      qnaList: [],
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
      console.log(action.payload.templateState)
      return {
        ...state,
        loading: false,
        templateList: action.payload.templateState.map(it => ({
          templateId: it.templateId,
          title: it.title,
          qnaList: it.questions,
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
