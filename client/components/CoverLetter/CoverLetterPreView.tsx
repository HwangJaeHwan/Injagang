import React from "react";
import styled from "styled-components";
import { ColBox, ScrollBar } from "@/styles/GlobalStyle";

const CoverLetterPreView = () => {
  return <CoverLetterPreViewContainer>미리보기</CoverLetterPreViewContainer>;
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
