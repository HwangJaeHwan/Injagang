import { Dispatch } from "redux";
import {
  feedBackDispatchType,
  FEEDBACK_SUCCESS,
  FEEDBACK_REQUEST,
  FEEDBACK_FAILURE,
  FEEDBACK_UPDATED,
} from "./types";
import {
  getFeedBackListAPI,
  reviseFeedBackAPI,
  writeFeedBackAPI,
} from "@/api/FEEDBACK/feedBackAPI";
import { IReviseFeedBack, IWriteFeedBack } from "@/types/feedback/FeedBackType";

export const getFeedbackList =
  (qnaId: number) => async (dispatch: Dispatch<feedBackDispatchType>) => {
    try {
      dispatch({ type: FEEDBACK_REQUEST });
      const response = await getFeedBackListAPI(qnaId);
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

export const updateFeedback =
  (updateData: IReviseFeedBack) =>
  async (dispatch: Dispatch<feedBackDispatchType>) => {
    try {
      dispatch({ type: FEEDBACK_REQUEST });
      const request = await reviseFeedBackAPI(updateData);
      if (request.status === 200) {
        dispatch({ type: FEEDBACK_UPDATED });
      }
    } catch (error: any) {
      dispatch({
        type: FEEDBACK_FAILURE,
        payload: { error },
      });
    }
  };

export const writeFeedback =
  (wirteData: IWriteFeedBack) =>
  async (dispatch: Dispatch<feedBackDispatchType>) => {
    try {
      dispatch({ type: FEEDBACK_REQUEST });
      const request = await writeFeedBackAPI(wirteData);
      if (request.status === 200) {
        dispatch({ type: FEEDBACK_UPDATED });
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
