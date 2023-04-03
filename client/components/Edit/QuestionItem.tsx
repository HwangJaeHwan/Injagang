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
  .essay_title{
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

interface QuestionItemProps {
  content: string | { question: string; answer: string; quna?: number };
  onChange: (index: number, value: string, title: string) => void;
  index: number;
  questionTitle: string;
  questionContent: React.Dispatch<React.SetStateAction<qnaList>>;
}

const QuestionItem = ({
  content,
  onChange,
  index,
  questionTitle,
  questionContent,
}: QuestionItemProps) => {
  const [text, setText] = useState("");

  useEffect(() => {
    if (index === 0) {
      questionContent([]);
    }
    const title = typeof content === "string" ? content : content.question;
    questionContent(cur => [...cur, { question: title, answer: "" }]);
    if (typeof content !== "string") {
      setText(content.answer);
    }
  }, [questionTitle]);

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
    const title = typeof content === "string" ? content : content.question;
    onChange(index, event.target.value, title);
  };

  return (
    <Card>
      <h3 className="essay_title">
        {index + 1}. {typeof content === "string" ? content : content.question}
      </h3>
      <textarea value={text} onChange={handleTextChange} />
      <p>
        글자 수: {text.length}/{500}
      </p>
    </Card>
  );
};

export default QuestionItem;

