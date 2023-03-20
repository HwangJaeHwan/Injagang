import React from "react";
import styled from "styled-components";
import CustomButton from "../UI/CustomButton";

const AddQustionListStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  button {
    font-size: 15px;
    margin: auto 2px;
  }
`;
const Input = styled.input`
  height: 40px;
  width: 37.5%;
`;

interface AddQustionListProps {
  title: string;
  handleAddQuestion: () => void;
  handleCancelQuestion: () => void;
  onChange: (value: string) => void;
}
const AddQustionList = ({
  title,
  handleAddQuestion,
  handleCancelQuestion,
  onChange,
}: AddQustionListProps) => {
  console.log("ADD")
  return (
    <AddQustionListStyle>
      <Input
        name="addTitle"
        placeholder="제목을 입력해주세요"
        value={title}
        onChange={e => onChange(e.target.value)}
      ></Input>
      <div>
        <CustomButton onClick={handleAddQuestion} text={"확인"} />
        <CustomButton onClick={handleCancelQuestion} text={"취소"} />
      </div>
    </AddQustionListStyle>
  );
};

export default AddQustionList;
