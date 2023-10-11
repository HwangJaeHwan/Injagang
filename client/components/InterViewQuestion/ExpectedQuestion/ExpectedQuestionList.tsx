import { ScrollBar } from "@/styles/GlobalStyle";
import React from "react";
import styled from "styled-components";
import ExpectedQuestionListItem from "./ExpectedQuestionListItem";
import { InterviewQuestionList } from "@/components/redux/InterViewQuestion/types";

interface ExpectedQuestionListProps {
  questions: InterviewQuestionList[];
  isAllCheck: boolean;
  handleCheckList: (id: number, isCheck: boolean) => void;
}
const ExpectedQuestionList = ({
  questions,
  isAllCheck,
  handleCheckList,
}: ExpectedQuestionListProps) => {
  return (
    <Container>
      {questions &&
        questions.map((question, i) => (
          <ExpectedQuestionListItem
            key={question.id}
            allCheck={isAllCheck}
            onChange={handleCheckList}
            {...question}
          ></ExpectedQuestionListItem>
        ))}
    </Container>
  );
};

export default ExpectedQuestionList;

const Container = styled.div`
  ${ScrollBar}
  width: 100%;
  height: 100%;
  overflow-x: hidden;
`;
