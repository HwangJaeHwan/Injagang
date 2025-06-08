import { TEMPLATE_APIS } from "../config";
import { fetcher, METHOD } from "../client";

import { IAddTemplate } from "@/types/template/TemplateType";

export const getTemplateAPI = async () => {
  return fetcher(METHOD.GET, TEMPLATE_APIS.GET_API);
};

export const addTemplateAPI = async (templatePayload: IAddTemplate) => {
  return fetcher(METHOD.POST, TEMPLATE_APIS.ADD_API, templatePayload);
};

export const deleteTemplateAPI = async (targetId: number) => {
  return fetcher(METHOD.DELETE, `${TEMPLATE_APIS.DELTE_API}${targetId}`);
};
