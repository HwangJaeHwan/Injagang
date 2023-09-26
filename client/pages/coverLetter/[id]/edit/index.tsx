import React from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { ColBox } from "@/styles/GlobalStyle";
import CoverLetterEdit from "@/components/CoverLetter/edit/CoverLetterEdit";

const CoverLetterEditorPage = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <CoverLetterEdit></CoverLetterEdit>
    </div>
  );
};

export default CoverLetterEditorPage;

const CoverLetterStyle = styled.div`
  ${ColBox}
`;
