import { FlexBox, ScrollBar } from "@/styles/GlobalStyle";
import React, { useState } from "react";
import styled from "styled-components";

const TextArea = styled.textarea`
  ${FlexBox}
  ${ScrollBar}
  resize: vertical;
  box-sizing: border-box;
  color: #22272e;
  background-color: #ffffff;
  font-weight: bold;
  width: 100%;
  line-height: 1.5;
  height: 400px;
  padding: 10px 15px;
  border-radius: 5px;
  overflow-y: auto;
  margin: 15px auto;
`;

const QuestionContent = () => {
  const [content, setContent] = useState<string>("");
  const handlTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  return (
    <div>
      <TextArea value={content} onChange={e => handlTextChange(e)}></TextArea>
    </div>
  );
};

export default QuestionContent;
