import React from "react";
import styled from "styled-components";
import CustomButton from "../UI/CustomButton";

const AddQustionListStyle = styled.div`
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
  width: 34%;
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
  return (
    <AddQustionListStyle>
      <Input
        name="addTitle"
        placeholder="제목을 입력해주세요"
        value={title}
        onChange={e => onChange(e.target.value)}
      ></Input>
      <div>
        <CustomButton onClick={handleAddQuestion} text={"작성완료"} />
        <CustomButton onClick={handleCancelQuestion} text={"취소하기"} />
      </div>
    </AddQustionListStyle>
  );
};

export default AddQustionList;
