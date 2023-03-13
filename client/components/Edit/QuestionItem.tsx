import { ColBox } from "@/styles/GlobalStyle";
import React, { useState } from "react";
import styled from "styled-components";
const Card = styled.div`
  ${ColBox}
  padding: 15px 15px;
  background-color:${({theme}) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  width: 85%;
  min-height: 300px;
  border-radius: 8px;
  box-shadow: 1px 2px 12px rgba(0, 0, 0, 0.6);
  text-align: center;
  margin: 15px 15px;

  textarea {
    display: flex;
    justify-content: center;
    align-items: center;
    resize: vertical;
    box-sizing: border-box;
    color: #22272E;
    background-color: #444654;
    font-weight: bold;
    width: 90%;
    line-height: 1.5;
    height: 300px;
    padding: 10px 15px;
    border-radius: 5px;
    overflow-y: auto;
    margin: 15px auto;
    ::-webkit-scrollbar {
      width: 10px;
    }

    ::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 10px;
    }

    ::-webkit-scrollbar-track {
      background-color: rgba(0, 0, 0, 0.1);
      border-radius: 10px;
    }
  }
`;

interface QuestionItemProps {
  content: string;
  onChange: (index: number, value: string, title: string) => void;
  index: number;
}

const QuestionItem = ({ content, onChange, index }: QuestionItemProps) => {
  const [text, setText] = useState("");

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
    onChange(index, text, content);
  };

  return (
    <Card>
      <h3>{index+1}.{" "}{content}</h3>
      <textarea value={text} onChange={handleTextChange} />
      <p>
        글자 수: {text.length}/{500}
      </p>
    </Card>
  );
};

export default QuestionItem;
