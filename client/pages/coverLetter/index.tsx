import React from "react";
import styled from "styled-components";
import { ColBox } from "@/styles/GlobalStyle";
import CoverLetter from "@/components/CoverLetter/CoverLetter";
import ErrorBoundary from "@/components/ErrorBoundary";

const CoverLetterPage = () => {
  return (
    <ErrorBoundary>
      <CoverLetterStyle>
        <CoverLetter />
      </CoverLetterStyle>
    </ErrorBoundary>
  );
};

export default CoverLetterPage;

const CoverLetterStyle = styled.div`
  ${ColBox}
`;
