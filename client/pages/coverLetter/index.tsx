import React from "react";
import styled from "styled-components";
import { ColBox } from "@/styles/GlobalStyle";
import CoverLetter from "@/components/CoverLetter/CoverLetter";

const CoverLetterPage = () => {
  return <CoverLetterStyle>
    <CoverLetter/>
  </CoverLetterStyle>;
};

export default CoverLetterPage;

const CoverLetterStyle = styled.div`
  ${ColBox}
`;
