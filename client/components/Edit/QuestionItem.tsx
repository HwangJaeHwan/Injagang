import { ColBox } from "@/styles/GlobalStyle";
import React from "react";
import styled from "styled-components";
const Card = styled.div`
  ${ColBox}
  padding: 15px 15px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  width: 85%;
  height: 400px;
  border-radius: 8px;
  box-shadow: 1px 2px 12px rgba(0, 0, 0, 0.6);
  text-align: center;
  margin: 15px 15px;
`;

interface QuestionItemProps {
  content: string;
}

const QuestionItem = ({ content }: QuestionItemProps) => {
  return (
    <Card>
      {content}
      <textarea />
    </Card>
  );
};

export default QuestionItem;
