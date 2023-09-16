import { IGetTemplate } from "@/types/template/TemplateType";

export const SET_CUR_TEMPLATE_LIST = "SET_CUR_TEMPLATE_LIST";
export const ADD_TEMPLATE_TOGGLE = "ADD_TEMPLAETE_TOGGLE";

export interface IsetCurTemplaetList {
  type: typeof SET_CUR_TEMPLATE_LIST;
  payload: {
    selectedTemplateList: IGetTemplate;
  };
}

export interface IaddTemplateToggle {
  type: typeof ADD_TEMPLATE_TOGGLE;
  payload: { isAddTemplate: boolean };
}

export type userTemplateDispatchType = IsetCurTemplaetList | IaddTemplateToggle;
