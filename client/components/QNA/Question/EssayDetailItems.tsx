import React, { useState } from "react";
import styled from "styled-components";

const EssayDetailItemsStyle = styled.div`
  margin-bottom: 50px;
`;
const EssayQuestionContainer = styled.div`
  border-top: 1.5px solid #e4dddd;
  border-bottom: 1.5px solid #e4dddd;
  padding: 12px;
  margin: 15px auto;
  font-size: 14px;
  line-height: 1.45;
`;

const EssayAnswerContainer = styled.div`
    line-height: 1.6;
`;

type EssayDetailItemsProps = {
  answer: string;
  question: string;
};
const EssayDetailItems = ({ answer, question }: EssayDetailItemsProps) => {
  return (
    <EssayDetailItemsStyle>
      <EssayQuestionContainer>
        <h4 className="essay_question">
          <span>질문:</span> {question}
        </h4>
      </EssayQuestionContainer>
      <EssayAnswerContainer>
          <p>답변:</p> {answer}{" "}
      </EssayAnswerContainer>
    </EssayDetailItemsStyle>
  );
};

export default EssayDetailItems;
