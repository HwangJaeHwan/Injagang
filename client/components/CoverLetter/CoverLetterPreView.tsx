import React from "react";
import styled from "styled-components";
import { ColBox, ScrollBar } from "@/styles/GlobalStyle";
import { useSelector } from "react-redux";
import { RootReducerType } from "../redux/store";

const CoverLetterPreViewItem = ({ question }: { question: string }) => (
  <h2>{question}</h2>
);

const CoverLetterPreView = () => {
  const { selectedEssayList } = useSelector(
    (state: RootReducerType) => state.userEssayList,
  );
  return (
    <CoverLetterPreViewContainer>
      {selectedEssayList.questions &&
        selectedEssayList.questions.map((item, idx) => (
          <CoverLetterPreViewItem key={idx} question={item} />
        ))}
    </CoverLetterPreViewContainer>
  );
};

export default CoverLetterPreView;

const CoverLetterPreViewContainer = styled.div`
  ${ColBox}
  ${ScrollBar}
  width: 90%;
  height: 200px;
  border-radius: 5px;
  padding: 15px 25px;
  margin: 15px auto;
  background-color: #1d1b1b;
  overflow-x: hidden;
`;
