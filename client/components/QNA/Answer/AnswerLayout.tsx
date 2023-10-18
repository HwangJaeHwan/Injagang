import React from "react";
import styled from "styled-components";
import { ColBox } from "@/styles/GlobalStyle";
import TargetFeedBackView from "@/components/QNA/Answer/TargetFeedBack/TargetFeedBackView";
import AnswerDetailView from "./AnswerDetail/AnswerDetailView";
import FeedBackComposer from "./FeedBack/FeedBackComposer";

export type CorrectionItem = {
  targetQuestion: number;
  targetAnswer: string;
  targetQuestionIndex: number;
};

const AnswerLayout = () => {
  //TODO:: 기본적인 컴포넌트 분리완료, 컴포넌트 모듈화 하고 상태에 대한 로직 분리하기, props에 따라 리덕스 고려하기 !!!!!!!
  //Corection에 대한 상태 떄문에 props 드릴링이 발생한다. 리덕스로 변경
  return (
    <AnswerWirteStyle>
      <AnswerDetailView />
      <FeedBackComposer />
      <TargetFeedBackView />
    </AnswerWirteStyle>
  );
};

export default AnswerLayout;

const AnswerWirteStyle = styled.div`
  ${ColBox}
  width: 100%;
  height: 90%;
  gap: 30px;
`;
