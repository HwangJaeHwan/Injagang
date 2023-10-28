import React, { useRef } from "react";
import { StyleTextArea } from "@/styles/GlobalStyle";
import styled from "styled-components";

interface TQuestionItemProps {
  index: number;
  question: string;
  onChange: (index: number, value: string) => void;
}

const TQuestionItem = React.forwardRef<HTMLTextAreaElement, TQuestionItemProps>(
  ({ index, question, onChange }, ref) => {
    return (
      <QuestionItem>
        {index + 1}. 질문:
        <StyleTextArea
          ref={ref}
          value={question}
          onChange={e => onChange(index, e.target.value)}
          placeholder="질문을 입력해주세요"
        />
      </QuestionItem>
    );
  },
);

export default React.memo(TQuestionItem);

const QuestionItem = styled.div`
  width: 80%;
  height: 120px;
  margin: auto 35px;
  margin-bottom: 45px;
`;
