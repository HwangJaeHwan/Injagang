import { Dispatch } from "redux";
import {
  feedBackDispatchType,
  FEEDBACK_SUCCESS,
  FEEDBACK_REQUEST,
  FEEDBACK_FAILURE,
} from "./types";
import fetcher, { METHOD } from "@/components/test/fecher";
import Cookies from "js-cookie";

export const getFeedbackList =
  (qnaId: number) => async (dispatch: Dispatch<feedBackDispatchType>) => {
    try {
      dispatch({ type: FEEDBACK_REQUEST });
      const response = await fetcher(METHOD.GET, `/board/feedback/${qnaId}`, {
        headers: { Authorization: Cookies.get("accessToken") },
      });
      if (response) {
        dispatch({
          type: FEEDBACK_SUCCESS,
          payload: {
            list: response.data,
          },
        });
      }
    } catch (error: any) {
      dispatch({
        type: FEEDBACK_FAILURE,
        payload: {
          error,
        },
      });
    }
  };

type UpdateFeedback = {
  feedbackId: number;
  reviseContent: string;
};
export const updateFeedback =
  (updateData: UpdateFeedback) =>
  async (dispatch: Dispatch<feedBackDispatchType>) => {
    try {
      dispatch({ type: FEEDBACK_REQUEST });
      const request = await fetcher(
        METHOD.PATCH,
        "/board/feedback/revise",
        updateData,
        {
          headers: {
            Authorization: Cookies.get("accessToken"),
          },
        },
      );
    } catch (error: any) {
      dispatch({
        type: FEEDBACK_FAILURE,
        payload: { error },
      });
    }
  };

type WirteFeedBack = {
  qnaId: number;
  feedbackTarget: string;
  feedbackContent: string;
};
export const writeFeedback =
  (wirteData: WirteFeedBack) =>
  async (dispatch: Dispatch<feedBackDispatchType>) => {
    try {
      dispatch({ type: FEEDBACK_REQUEST });
      const request = fetcher(METHOD.POST, "/board/feedback", wirteData, {
        headers: {
          Authorization: Cookies.get("accessToken"),
        },
      });
    } catch (error: any) {
      dispatch({
        type: FEEDBACK_FAILURE,
        payload: {
          error,
        },
      });
    }
  };
