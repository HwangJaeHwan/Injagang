import React, { useCallback } from "react";
import {
  getFeedbackList,
  updateFeedback,
  writeFeedback,
} from "@/components/redux/FeedBack/action";
import { IWriteFeedBack } from "@/types/feedback/FeedBackType";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootReducerType } from "@/components/redux/store";

const useFeedManager = () => {
  const dispatch = useDispatch();
  const { feedbackList, isUpdated } = useSelector(
    (state: RootReducerType) => state.feedBack,
  );

  const dispatchWriteFeedBack = useCallback((resiveData: IWriteFeedBack) => {
    dispatch(writeFeedback(resiveData));
  }, []);

  const dispatchUpdateFeedBack = useCallback(
    (feedbackId: number, reviseContent: string) => {
      const formatData = {
        feedbackId,
        reviseContent,
      };
      dispatch(updateFeedback(formatData));
    },
    [],
  );

  const dispatchGetFeedList = useCallback((targetFeed: number) => {
    dispatch(getFeedbackList(targetFeed));
  }, []);

  return {
    dispatchWriteFeedBack,
    dispatchUpdateFeedBack,
    dispatchGetFeedList,
    feedbackList,
    isUpdated,
  };
};

export default useFeedManager;
