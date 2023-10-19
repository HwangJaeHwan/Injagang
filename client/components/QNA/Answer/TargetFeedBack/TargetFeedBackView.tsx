import React, { useEffect } from "react";
import styled from "styled-components";
import { ColBox } from "@/styles/GlobalStyle";
import userQnaManager from "../../hooks/userQnaManager";
import useFeedManager from "../../hooks/useFeedManager";
import TargetFeedBackItems from "./TargetFeedBackItems";

const TargetFeedBackView = () => {
  const {
    feedbackList,
    isUpdated,
    dispatchGetFeedList,
    dispatchUpdateFeedBack,
  } = useFeedManager();
  const { targetFeed } = userQnaManager();

  useEffect(() => {
    if (targetFeed !== 0) {
      dispatchGetFeedList(targetFeed);
    }
  }, [targetFeed, isUpdated]);

  return (
    <FeedBackViewStyle>
      {feedbackList?.map(feedback => (
        <TargetFeedBackItems
          key={feedback.feedbackId}
          handleUpdateFeedBack={dispatchUpdateFeedBack}
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
