import { ColBox, ScrollBar } from "@/styles/GlobalStyle";
import React, { useState, useEffect } from "react";
import styled, { useTheme } from "styled-components";
const Card = styled.div`
  ${ColBox}
  padding: 15px 15px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  width: 85%;
  min-height: 300px;
  border-radius: 8px;
  box-shadow: 1px 2px 12px rgba(0, 0, 0, 0.6);
  margin: 15px 15px;
  .essay_title {
    width: 88%;
    word-break: break-all;
  }

  textarea {
    display: flex;
    justify-content: center;
    align-items: center;
    resize: vertical;
    box-sizing: border-box;
    color: #22272e;
    background-color: #444654;
    font-weight: bold;
    width: 90%;
    line-height: 1.5;
    height: 300px;
    padding: 10px 15px;
    border-radius: 5px;
    overflow-y: auto;
    margin: 15px auto;
    ${ScrollBar}
  }
`;

interface qnaListItem {
  question: string;
  answer: string;
}

interface qnaList extends Array<qnaListItem> {}

interface QnAListItemProps {
  content: string | { question: string; answer: string; quna?: number };
  index: number;
  templateTitle: string;
  onChange: (index: number, question: string, answer: string) => void;
  // questionContent: React.Dispatch<React.SetStateAction<qnaList>>;
}

const QnAListItem = ({
  content,
  index,
  templateTitle,
  onChange,
}: QnAListItemProps) => {
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState("");

  useEffect(() => {
    setQuestion(
      typeof content === "string"
        ? `${index + 1} ${content}`
        : `${index + 1} ${content.question}`,
    );
  }, []);

  //   <h3 className="essay_title">
  //   {index + 1}. {typeof content === "string" ? content : content.question}
  // </h3>
  return (
    <Card>
      <textarea value={question} onChange={e => setQuestion(e.target.value)} />
      <textarea
        value={answer}
        onChange={e => setAnswer(e.target.value)}
        onBlur={() => onChange(index, question, answer)}
      />
      <p>
        글자 수: {answer.length}/{500}
      </p>
    </Card>
  );
};

export default QnAListItem;
