import { Card, ColBox } from "@/styles/GlobalStyle";
import { IReadQnaList } from "@/types/essay/EssayType";
import { BiX } from "react-icons/bi";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
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
  const [answer, setAnswer] = useState(item.question);
  const [question, setQuestion] = useState(item.question);

  return (
    <CoverLetterQuestionItemsContainer>
      <CLQHeader>
        <BiX onClick={() => onDelete(item.qnaId)} />
      </CLQHeader>
      <textarea value={question} onChange={e => setQuestion(e.target.value)} />
      <textarea
        value={answer}
        onChange={e => setAnswer(e.target.value)}
        onBlur={() => onUpdate(item.qnaId, question, answer)}
      />
      <h2>{item.qnaId}</h2>
    </CoverLetterQuestionItemsContainer>
  );
};

export default CoverLetterQuestionItems;

const CoverLetterQuestionItemsContainer = styled.div`
  ${ColBox}
  padding: 15px 15px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  width: 100%;
  min-height: 300px;
  border-radius: 8px;
  box-shadow: 1px 2px 12px rgba(0, 0, 0, 0.6);
  margin: 25px auto;
`;

const CLQHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
