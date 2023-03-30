import {
  TEMPLATE_REQUEST,
  TEMPLATE_SUCCESS,
  TEMPLATE_FAILURE,
  templateDispatchType,
} from "./types";
import { METHOD } from "@/components/test/fecher";
import fetcher from "@/components/test/fecher";
import { Dispatch } from "redux";
import Cookies from "js-cookie";

type TemplateAdd = {
  title: string;
  questions: string[];
};


/**템플릿을 삭제 요청후 삭제가 반영된 템플릿 요청*/
export const removeTemplate =
  (templateId: number) =>
  async (dispatch: Dispatch<templateDispatchType>): Promise<void> => {
    try {
      dispatch({ type: TEMPLATE_REQUEST });
      const removeTemplate = await fetcher(
        METHOD.DELETE,
        `/template/${templateId}`,
        {
          headers: { Authorization: Cookies.get("accessToken") },
        },
      );
      const response = await fetcher(METHOD.GET, "/template", {
        headers: { Authorization: Cookies.get("accessToken") },
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

/**템플릿 추가요청후 추가된 템플릿 리스트 반환 */
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
          headers: { Authorization: Cookies.get("accessToken") },
        },
      );
      const response = await fetcher(METHOD.GET, "/template", {
        headers: { Authorization: Cookies.get("accessToken") },
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

/**최초 로딩시 템플릿리스트 반환 */
export const getTemplate =
  () =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch({ type: TEMPLATE_REQUEST });
      const response = await fetcher(METHOD.GET, "/template", {
        headers: { Authorization: Cookies.get("accessToken") },
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
