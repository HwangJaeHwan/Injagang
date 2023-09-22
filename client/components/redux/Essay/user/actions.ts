import { IGetTemplate } from "@/types/template/TemplateType";
import { SET_CUR_ESSAY_LIST } from "./types";

export const setCurEssayList = (essayList: IGetTemplate) => ({
  type: SET_CUR_ESSAY_LIST,
  payload: { selectedEssayList: essayList },
});
