import React from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { ColBox } from "@/styles/GlobalStyle";
import CoverLetterEdit from "@/components/CoverLetter/edit/CoverLetterEdit";

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
