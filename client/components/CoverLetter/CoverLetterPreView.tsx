import React from "react";

import styled from "styled-components";

import { useSelector } from "react-redux";
import { RootReducerType } from "../redux/store";

import { ColBox, ScrollBar } from "@/styles/GlobalStyle";
import { v } from "@/styles/variables";

const CoverLetterPreViewItem = ({
  idx,
  question,
}: {
  idx: number;
  question: string;
}) => <CoverLetterTitle>{idx+1}. {question}</CoverLetterTitle>;

const CoverLetterPreView = () => {
  const { selectedEssayList } = useSelector(
    (state: RootReducerType) => state.userEssayList,
  );
  return (
    <CoverLetterPreViewContainer>
      {selectedEssayList.questions.map((question, idx) => (
        <CoverLetterPreViewItem key={idx} question={question} idx={idx} />
      ))}
    </CoverLetterPreViewContainer>
  );
};

export default CoverLetterPreView;

const CoverLetterPreViewContainer = styled.div`
  ${ColBox}
  ${ScrollBar}
  width: 100%;
  height: 200px;
  border-radius: 5px;
  padding: 15px 25px;
  margin: 15px auto;
  background-color: #1d1b1b;
  overflow-x: hidden;
  box-shadow: ${v.boxShadow2};
`;

const CoverLetterTitle = styled.h2`
  margin-top: 11px;
`