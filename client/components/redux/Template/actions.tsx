import {
  TEMPLATE_REQUEST,
  TEMPLATE_SUCCESS,
  TEMPLATE_FAILURE,
  templateDispatchType,
} from "./types";
import { METHOD } from "@/components/test/fecher";
import fetcher from "@/components/test/fecher";
import { Dispatch } from "redux";
import { headers } from "../rootReducer";
import { authDispatchType } from "../Auth/types";
import { METHODS } from "http";

type TemplateAdd = {
  title: string;
  questions: string[];
};

export const removeTemplate =
  (templateId: number) =>
  async (dispatch: Dispatch<templateDispatchType>): Promise<void> => {
    try {
      dispatch({ type: TEMPLATE_REQUEST });
      const removeTemplate = await fetcher(
        METHOD.DELETE,
        `/template/${templateId}`,
        {
          headers,
        },
      );
      const response = await fetcher(METHOD.GET, "/template", {
        headers,
      });
      if (response) {
        dispatch({
          type: TEMPLATE_SUCCESS,
          payload: {
            templateState: response.data,
          },
        });
      }
    } catch (error) {
      dispatch({
        type: TEMPLATE_FAILURE,
        payload: {
          error,
        },
      });
    }
  };

export const addTemplate =
  (listData: TemplateAdd) =>
  async (dispatch: Dispatch<templateDispatchType>): Promise<void> => {
    try {
      dispatch({ type: TEMPLATE_REQUEST });
      const addTemplate = await fetcher(
        METHOD.POST,
        "/template/add",
        listData,
        {
          headers,
        },
      );
      const response = await fetcher(METHOD.GET, "/template", {
        headers,
      });
      if (response) {
        dispatch({
          type: TEMPLATE_SUCCESS,
          payload: {
            templateState: response.data,
          },
        });
      }
    } catch (error) {
      dispatch({
        type: TEMPLATE_FAILURE,
        payload: {
          error,
        },
      });
    }
  };

export const initTemplate =
  () =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch({ type: TEMPLATE_REQUEST });
      const response = await fetcher(METHOD.GET, "/template", {
        headers,
      });
      if (response) {
        dispatch({
          type: TEMPLATE_SUCCESS,
          payload: {
            templateState: response.data,
          },
        });
      }
    } catch (error) {
      dispatch({
        type: TEMPLATE_FAILURE,
        payload: {
          error,
        },
      });
    }
  };
