import React from "react";

import styled from "styled-components";

type CoverLetterDetailItemsProps = {
  answer: string;
  question: string;
};

const CoverLetterItem = ({ answer, question }: CoverLetterDetailItemsProps) => {
  return (
    <CoverLetterDetailItemsStyle>
      <CoverLetterQuestionContainer>
        <h4 className="coverletter_question">
          <span>질문:</span> {question}
        </h4>
      </CoverLetterQuestionContainer>
      <CoverLetterAnswerContainer>
        <p>답변:</p> {answer}{" "}
      </CoverLetterAnswerContainer>
    </CoverLetterDetailItemsStyle>
  );
};

export default CoverLetterItem;

const CoverLetterDetailItemsStyle = styled.div`
  margin-bottom: 50px;
`;
const CoverLetterQuestionContainer = styled.div`
  border-top: 1.5px solid #e4dddd;
  border-bottom: 1.5px solid #e4dddd;
  padding: 12px;
  margin: 15px auto;
  font-size: 14px;
  line-height: 1.45;
`;

const CoverLetterAnswerContainer = styled.div`
  line-height: 1.6;
`;
