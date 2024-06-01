import { IGetTemplate } from "@/types/template/TemplateType";

export const SET_CUR_TEMPLATE_LIST = "SET_CUR_TEMPLATE_LIST";
export const ADD_TEMPLATE_TOGGLE = "ADD_TEMPLAETE_TOGGLE";
export const INIT_CUR_TEMPLATE_LIST = "INIT_CUR_TEMPLATE_LIST";

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

export interface InitCurTemplateList {
  type: typeof INIT_CUR_TEMPLATE_LIST;
}

export type userTemplateDispatchType =
  | IsetCurTemplaetList
  | IaddTemplateToggle
  | InitCurTemplateList;
