import React, { useState } from "react";
import styled from "styled-components";
import { Card, ScrollBar } from "@/styles/GlobalStyle";

import TextArea from "@/components/UI/TextArea";
import CorrectionView from "./CorrectionView";
import userQnaManager from "../../hooks/userQnaManager";
import FeedBackFooter from "./FeedBackFooter";
import useQnaManager from "../../hooks/useQnaManager";
import useFeedBackLogic from "../../hooks/useFeedBackLogic";

const FeedBackComposer = () => {
  const { dispatchChangeFeed, targetFeed } = userQnaManager();
  const { qnaIdList } = useQnaManager();
  const {
    selectedCorrection,
    handleChangeFeedBack,
    isViolation,
    isFeedBackClear,
    handleSubmit,
    handleClear,
    Modal,
  } = useFeedBackLogic();

  //TODO:: 기본적인 컴포넌트 분리완료, 컴포넌트 모듈화 하고 상태에 대한 로직 분리하기, props에 따라 리덕스 고려하기 !!!!!!!

  //Corection에 대한 상태 떄문에 props 드릴링이 발생한다. 리덕스로 변경
  return (
    <Card size={{ width: "80%", height: "35vh", flex: "col" }}>
      <CorrectionView {...selectedCorrection} />
      <CommentTop>
        <TextArea
          handleChangeText={handleChangeFeedBack}
          violation={isViolation}
          clear={isFeedBackClear}
        ></TextArea>
      </CommentTop>
      <FeedBackFooter
        handleFeedBackIndex={dispatchChangeFeed}
        handleSubmit={handleSubmit}
        handleClear={handleClear}
        qnaIdList={qnaIdList}
        feedBackIndex={targetFeed}
      />
      <Modal />
    </Card>
  );
};

export default FeedBackComposer;

const CommentTop = styled.div`
  height: 50%;
  width: 100%;
  margin: 15px auto;
  textarea {
    ${ScrollBar}
    height: 100%;
    width: 100%;
    border-radius: 15px;
    resize: none;
  }
`;
