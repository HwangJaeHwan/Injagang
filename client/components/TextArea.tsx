import { FlexBox, ScrollBar } from "@/styles/GlobalStyle";
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const TextAreaStyle = styled.textarea`
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
type TextAreaProps = {
  handleChangeText: (content: string) => void;
  readOnly?: boolean;
  clear?: boolean;
  originData?: string;
  message?: string;
  violation?: boolean;
};
const TextArea = ({
  handleChangeText,
  readOnly = false,
  clear,
  originData,
  violation,
}: TextAreaProps) => {
  const [text, setText] = useState(originData ? originData : "");
  const textRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (clear) {
      setText("");
      textRef.current?.focus();
    }
    if (violation) {
      textRef.current?.focus();
    }
  }, [clear, violation]);

  return (
    <TextAreaStyle
      ref={textRef}
      value={text}
      readOnly={readOnly}
      onChange={e => setText(e.target.value)}
      onBlur={() => handleChangeText(text)}
    ></TextAreaStyle>
  );
};

export default TextArea;
