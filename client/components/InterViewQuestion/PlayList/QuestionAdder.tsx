import React, { useState, useRef } from "react";
import styled from "styled-components";
import { StyleButton } from "@/styles/GlobalStyle";

const AddTextInputStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  button {
    margin: auto 2px;
  }
`;
const Input = styled.input`
  height: 40px;
  width: 37.5%;
`;

interface AddTextInputProps {
  handleAddQuestion: (title: string) => void;
  handleCancelQuestion: () => void;
}
const QuestionAdder = ({
  handleAddQuestion,
  handleCancelQuestion,
}: AddTextInputProps) => {
  const [title, setTitle] = useState<string>("");
  const textRef = useRef<HTMLInputElement | null>(null);
  const handleAddText = () => {
    handleAddQuestion(title);
    setTitle("");
    textRef.current?.focus();
  };
  return (
    <AddTextInputStyle>
      <Input
        ref={textRef}
        name="addTitle"
        placeholder="제목을 입력해주세요"
        value={title}
        onChange={e => setTitle(e.target.value)}
      ></Input>
      <div>
        <StyleButton
          Size={{ width: "63px", font: "15px" }}
          onClick={handleAddText}
        >
          확인
        </StyleButton>
        <StyleButton
          Size={{ width: "63px", font: "15px" }}
          onClick={handleCancelQuestion}
        >
          확정
        </StyleButton>
      </div>
    </AddTextInputStyle>
  );
};

export default QuestionAdder;
