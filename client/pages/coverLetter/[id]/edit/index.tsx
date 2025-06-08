import React from "react";

import styled from "styled-components";

import CoverLetterEdit from "@/components/CoverLetter/edit/CoverLetterEdit";

import { ColBox } from "@/styles/GlobalStyle";


const CoverLetterEditorPage = () => {
  return (
    <CoverLetterStyle>
      <CoverLetterEdit></CoverLetterEdit>
    </CoverLetterStyle>
  );
};

export default CoverLetterEditorPage;

const CoverLetterStyle = styled.div`
  ${ColBox}
`;
