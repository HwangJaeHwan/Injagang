import { IGetTemplate } from "@/types/template/TemplateType";
import { SET_CUR_TEMPLATE_LIST, ADD_TEMPLAETE_TOGGLE } from "./types";

export const setCurTemplateList = (TemplateList: IGetTemplate) => ({
  type: SET_CUR_TEMPLATE_LIST,
  payload: TemplateList,
});

export const addTemplaetToggle = (isAddTemplate:boolean = true) => ({
  type: ADD_TEMPLAETE_TOGGLE,
  payload: isAddTemplate,
});