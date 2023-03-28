import React from "react";
import styled from "styled-components";

const ControlMenuSelect =  styled.select`
  width: 250px;
  height: 30px;
  border-radius: 5px;
  background-color: ${({theme})=> theme.colors.primary};
  color: ${({theme})=> theme.colors.text};
`
type qna = {
  question: string;
  answer: string;
};

interface ControlMenuProps {
    value: string;
    onChange: React.Dispatch<React.SetStateAction<string>>;
    optionList: { title: string; qnaList:  Array<string|qna>}[];
  }

const ControlMenu = ({ value, onChange, optionList }: ControlMenuProps) => {
  return (
    <ControlMenuSelect value={value} onChange={e => onChange(e.target.value)}>
      {optionList.map((option, index) => (
        <option key={index} value={option.title}>
          {option.title}
        </option>
      ))}
    </ControlMenuSelect>
  );
};

export default ControlMenu;
