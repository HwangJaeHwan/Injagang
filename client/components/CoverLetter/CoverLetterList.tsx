import React from "react";
import styled from "styled-components";
import { ColBox, ScrollBar } from "@/styles/GlobalStyle";
import CoverLetterItems from "./CoverLetterItems";

const CoverLetterList = () => {
  return (
    <CoverLetterListContainer>
      <CoverLetterItems />
    </CoverLetterListContainer>
  );
};

export default CoverLetterList;

const CoverLetterListContainer = styled.div`
  ${ColBox}
  ${ScrollBar}
  background-color: #302e2e;
  border-radius: 5px;
  width: 90%;
  height: 350px;
  margin: 15px auto;
  overflow-x: hidden;
`;
