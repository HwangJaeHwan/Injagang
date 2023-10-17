import { Card, ScrollBar } from "@/styles/GlobalStyle";
import React from "react";
import styled from "styled-components";
import CorrectionView from "../CorrectionView";
import TextArea from "@/components/UI/TextArea";
import { CorrectionItem } from "../AnswerWirte";
import FeedBackFooter from "./FeddBackFooter";

interface FeedBackComposerProps {
  correction: CorrectionItem;
  handleChangeFeedBack: (text: string) => void;
  isViolation: boolean;
  isFeedBackClear: boolean;
  handleClear: () => void;
  handleSubmit: () => void;
  qnaIdList: number[];
  feedBackIndex: number;
  handleFeedBackIndex: (qnaId: number) => void;
}

const FeedBackComposer = ({
  correction,
  handleChangeFeedBack,
  isViolation,
  isFeedBackClear,
  handleClear,
  handleFeedBackIndex,
  handleSubmit,
  qnaIdList,
  feedBackIndex,
}: FeedBackComposerProps) => (
  <Card size={{ width: "80%", height: "35vh", flex: "col" }}>
    <CorrectionView {...correction} />
    <CommentTop>
      <TextArea
        handleChangeText={handleChangeFeedBack}
        violation={isViolation}
        clear={isFeedBackClear}
      ></TextArea>
    </CommentTop>
    <FeedBackFooter
      handleFeedBackIndex={handleFeedBackIndex}
      handleSubmit={handleSubmit}
      handleClear={handleClear}
      qnaIdList={qnaIdList}
      feedBackIndex={feedBackIndex}
    />
  </Card>
);
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
