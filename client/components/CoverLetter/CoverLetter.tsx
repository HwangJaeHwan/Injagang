import React from "react";
import styled from "styled-components";
import { v } from "@/styles/variables";
import { ColBox } from "@/styles/GlobalStyle";
import CoverLetterPreView from "./CoverLetterPreView";
import CoverLetterList from "./CoverLetterList";

const CoverLetter = () => {
  return (
    <CoverLetterContainer>
      <CoverLetterPreView />
      <ListHeader>나의 자소서 목록</ListHeader>
      <CoverLetterList/>
    </CoverLetterContainer>
  );
};

export default CoverLetter;

const CoverLetterContainer = styled.div`
  width: ${v.lgWidth};
  height: 600px;
  ${ColBox}
  .footer_icon svg {
    font-size: 50px;
    margin-bottom: 30px;
    cursor: pointer;
  }
  @media screen and (max-width: 900px) {
    width: ${v.smWidth};
  }
`;

const ListHeader = styled.div`
  text-align: center;
  width: 90%;
  font-size: 23px;
  font-weight: bold;
  background-color: #302e2e;
  border-radius: 5px;
`;
