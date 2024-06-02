import React, { useEffect } from "react";

import { useDispatch } from "react-redux";

import styled from "styled-components";

import QuestionComposer from "@/components/QNA/Question/QuestionComposer";
import { getEssayList, setClearReadEssay } from "@/components/redux/Essay/server/actions";

import { ColBox } from "@/styles/GlobalStyle";

const WirteStyle = styled.div`
  ${ColBox}
  height: 100vh;
  width: 100%;
`;

const question = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEssayList());
    return () => {
      dispatch(setClearReadEssay());
    }
  }, []);

  return (
    <WirteStyle>
      <QuestionComposer />
    </WirteStyle>
  );
};

export default question;
