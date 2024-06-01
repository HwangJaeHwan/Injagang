import React from "react";

import styled from "styled-components";
// import { QuestionType } from "../redux/InterViewQuestion/action";

interface SelectProps {
  Size: {
    width: string;
    height: string;
  };
}

const ControlMenuSelect = styled.select<SelectProps>`
  width: ${({ Size }) => Size.width || "100%"};
  height: ${({ Size }) => Size.height || "100%"};
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
`;

interface ControlMenuProps {
  value: string;
  onChange: (
    selected: string,
  ) => void | React.Dispatch<React.SetStateAction<string>>;
  optionList: { title: string }[];
  Size: { width: string; height: string };
}

const ControlMenu = ({
  value,
  onChange,
  optionList,
  Size,
}: ControlMenuProps) => {
  return (
    <ControlMenuSelect
      Size={Size}
      value={value}
      onChange={e => onChange(e.target.value)}
    >
      <option value="" disabled>
        Please select
      </option>
      {optionList.map((option, index) => (
        <option key={index} value={option.title}>
          {option.title}
        </option>
      ))}
    </ControlMenuSelect>
  );
};

export default ControlMenu;
