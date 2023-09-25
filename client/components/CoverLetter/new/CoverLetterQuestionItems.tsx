import { Card, ColBox, ScrollBar } from "@/styles/GlobalStyle";
import { IReadQnaList } from "@/types/essay/EssayType";
import { BiX } from "react-icons/bi";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { v } from "@/styles/variables";
interface CoverLetterQuestionItemsProps {
  item: IReadQnaList;
  onDelete: (targetID: string | number) => void;
  onUpdate: (
    targetID: string | number,
    newQuestion: string,
    newAnswer: string,
  ) => void;
}

const CoverLetterQuestionItems = ({
  item,
  onDelete,
  onUpdate,
}: CoverLetterQuestionItemsProps) => {
  const [question, setQuestion] = useState(item.question);
  const [answer, setAnswer] = useState(item.answer);

  return (
    <CoverLetterQuestionItemsContainer>
      <CLQHeader>
        <BiX onClick={() => onDelete(item.qnaId)} />
      </CLQHeader>
      <QuestionTextArea
        value={question}
        onChange={e => setQuestion(e.target.value)}
      />
      <AnswerTextArea
        value={answer}
        onChange={e => setAnswer(e.target.value)}
        onBlur={() => onUpdate(item.qnaId, question, answer)}
      />
      {`글자수 : ${answer.length}/500`}
    </CoverLetterQuestionItemsContainer>
  );
};

export default React.memo(CoverLetterQuestionItems);

const CoverLetterQuestionItemsContainer = styled.div`
  ${ColBox}
  padding: 15px 15px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  width: 60%;
  min-height: 250px;
  border-radius: 8px;
  box-shadow: ${v.boxShadow3};
  margin: 25px auto;
`;

const CLQHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const QuestionTextArea = styled.textarea`
  font-family: "Nanum Pen Script";
  font-size: 15px;

  box-sizing: border-box;
  width: 90%;
  min-height: 30px;
  max-height: 200px;
  resize: vertical;

  border-radius: 5px;
  background-color: #444654;
  color: white;

  padding: 15px;
  ${ScrollBar};
`;

const AnswerTextArea = styled.textarea`
  resize: vertical;
  font-family: "Nanum Pen Script";
  font-weight: normal;
  width: 90%;
  line-height: 2;
  height: 300px;
  border-radius: 5px;
  margin: 8px auto;
  padding: 20px;
  color: white;
  background-color: #444654;
  ${ScrollBar}
`;
