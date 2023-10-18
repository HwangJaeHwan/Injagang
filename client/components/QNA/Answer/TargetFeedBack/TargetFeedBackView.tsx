import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootReducerType } from "../../../redux/store";
import {
  getFeedbackList,
  updateFeedback,
} from "../../../redux/FeedBack/action";
import TargetFeedBackItems from "./TargetFeedBackItems";
import { ColBox } from "@/styles/GlobalStyle";
import userQnaManager from "../../hooks/userQnaManager";

const TargetFeedBackView = () => {
  const dispatch = useDispatch();
  const {feedbackList,isUpdated} = useSelector(
    (state: RootReducerType) => state.feedBack
  );
  const { targetFeed } = userQnaManager();

  const handleUpdateFeedBack = (feedbackId: number, reviseContent: string) => {
    const data = {
      feedbackId,
      reviseContent,
    };
    dispatch(updateFeedback(data));
  };

  useEffect(() => {
    if (targetFeed !== 0) {
      dispatch(getFeedbackList(targetFeed));
    }
  }, [targetFeed, isUpdated]);

  return (
    <FeedBackViewStyle>
      {feedbackList?.map(feedback => (
          <TargetFeedBackItems
            key={feedback.feedbackId}
            handleUpdateFeedBack={handleUpdateFeedBack}
            {...feedback}
          ></TargetFeedBackItems>
        ))}
    </FeedBackViewStyle>
  );
};

export default TargetFeedBackView;

const FeedBackViewStyle = styled.div`
  ${ColBox}
  height: 100%;
  width: 100%;
  margin-top: 5vh;
`;
