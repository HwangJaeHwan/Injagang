import React from "react";

import styled from "styled-components";

import CoverLetter from "@/components/CoverLetter/CoverLetter";

import { ColBox } from "@/styles/GlobalStyle";

const CoverLetterPage = () => {
  return (
    <CoverLetterStyle>
      <CoverLetter />
    </CoverLetterStyle>
  );
};

export default CoverLetterPage;

const CoverLetterStyle = styled.div`
  ${ColBox}
`;
