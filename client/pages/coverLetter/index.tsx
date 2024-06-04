import React, { useEffect } from "react";

import styled from "styled-components";
import { ColBox } from "@/styles/GlobalStyle";

import CoverLetter from "@/components/CoverLetter/CoverLetter";

import { useDispatch } from "react-redux";
import { setInitCurEssayList } from "@/components/redux/Essay/user/actions";
import { setClearReadEssay } from "@/components/redux/Essay/server/actions";

const CoverLetterPage = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(setInitCurEssayList());
      dispatch(setClearReadEssay());
    };
  }, []);
  
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
