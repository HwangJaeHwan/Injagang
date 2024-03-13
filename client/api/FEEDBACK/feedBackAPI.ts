import { FEED_APIS } from "../config";
import { fetcher, METHOD } from "../client";

import { IReviseFeedBack, IWriteFeedBack } from "@/types/feedback/FeedBackType";

export const getFeedBackListAPI = async (targetId: number) => {
  return fetcher(METHOD.GET, `${FEED_APIS.GET_API}${targetId}`);
};

export const reviseFeedBackAPI = async (feedBackPayload: IReviseFeedBack) => {
  return fetcher(METHOD.PATCH, FEED_APIS.REVISE_API, feedBackPayload);
};

export const writeFeedBackAPI = async (feedbackPayload: IWriteFeedBack) => {
  return fetcher(METHOD.POST, FEED_APIS.WRITE_API, feedbackPayload);
};
