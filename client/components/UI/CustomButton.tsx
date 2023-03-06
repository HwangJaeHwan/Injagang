import React from "react";
import styled from "styled-components";

interface ButtonProps {
    onClick: () => void;
    text: string;
}

const DarkButton = ({onClick,text}: ButtonProps) => {
  return <BeautyButton onClick={onClick}>{text}</BeautyButton>;
};
const BeautyButton = styled.button`
  background-color: ${({theme}) => theme.colors.secondary};
  color: #fff;
  border: none;
  padding: 13px 20px;
  border-radius: 10px;
  font-weight: bold;
  font-size: 16px;
  box-shadow: 0 1.5px 2px rgba(0, 0, 0, 09);
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #777;
  }

  &:active {
    background-color: red;
  }
`;
export default DarkButton;
