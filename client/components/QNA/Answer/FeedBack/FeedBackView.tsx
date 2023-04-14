import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootReducerType } from "../../../redux/store";
import {
  getFeedbackList,
  updateFeedback,
} from "../../../redux/FeedBack/action";
import FeedBackItems from "./FeedBackItems";
import { ColBox } from "@/styles/GlobalStyle";

const FeedBackViewStyle = styled.div`
  ${ColBox}
  width: 100%;
  margin-top: 10vh;
`;

type FeedBackViewProps = {
  targetNumber: number;
};

const FeedBackView = ({ targetNumber }: FeedBackViewProps) => {
  const dispatch = useDispatch();

  const feedbackList = useSelector(
    (state: RootReducerType) => state.feedBack.feedbackList,
  );

  const feedIsUpdated = useSelector(
    (state: RootReducerType) => state.feedBack.isUpdated,
  );

  const handleUpdateFeedBack = (feedbackId: number, reviseContent: string) => {
    const data = {
      feedbackId,
      reviseContent,
    };
    dispatch(updateFeedback(data));
  };

  useEffect(() => {
    if (targetNumber !== 0) {
      dispatch(getFeedbackList(targetNumber));
    }
  }, [targetNumber, feedIsUpdated]);

  return (
    <FeedBackViewStyle>
      {feedbackList &&
        feedbackList.map((feedback, idx) => (
          <FeedBackItems
            key={feedback.feedbackId}
            handleUpdateFeedBack={handleUpdateFeedBack}
            {...feedback}
          ></FeedBackItems>
        ))}
    </FeedBackViewStyle>
  );
};

export default FeedBackView;
