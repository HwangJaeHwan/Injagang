import React, { useState, useRef } from "react";
import styled from "styled-components";
import CustomButton from "../UI/CustomButton";
import { text } from "stream/consumers";

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
const AddTextInput = ({
  handleAddQuestion,
  handleCancelQuestion,
}: AddTextInputProps) => {
  const [title, setTitle] = useState<string>("");
  const textRef = useRef<HTMLInputElement | null>(null);
  const handleAddText = (target = null) => {
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
        <CustomButton
          Size={{ width: "63px", font: "15px" }}
          onClick={handleAddText}
          text={"확인"}
        />
        <CustomButton
          Size={{ width: "63px", font: "15px" }}
          onClick={handleCancelQuestion}
          text={"확정"}
        />
      </div>
    </AddTextInputStyle>
  );
};

export default AddTextInput;
