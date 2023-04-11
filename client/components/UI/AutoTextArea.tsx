import { FlexBox, ScrollBar } from "@/styles/GlobalStyle";
import React, { useState } from "react";
import { text } from "stream/consumers";
import styled from "styled-components";

const StyledTextarea = styled.textarea`
  ${FlexBox}
  ${ScrollBar};
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
`;

type AutoResizeTextAreaProps = {
  handleChangeText: (title: string) => void;
  originData?: string;
};
const AutoResizeTextArea = ({
  handleChangeText,
  originData,
}: AutoResizeTextAreaProps) => {
  const [text, setText] = useState<string>(originData ? originData : "");

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + "px";
  };

  return (
    <StyledTextarea
      value={text}
      onChange={handleChange}
      onBlur={() => handleChangeText(text)}
    />
  );
};

export default AutoResizeTextArea;
