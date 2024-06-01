import React, { useEffect } from "react";

import styled from "styled-components";
import { ColBox } from "@/styles/GlobalStyle";

import CoverLetter from "@/components/CoverLetter/CoverLetter";

import { useDispatch } from "react-redux";
import { setInitCurEssayList } from "@/components/redux/Essay/user/actions";

const CoverLetterPage = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    return () => {
      dispatch(setInitCurEssayList());
    }
  },[])
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
