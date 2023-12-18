import QuestionComposer from "@/components/QNA/Question/QuestionComposer";
import { ColBox } from "@/styles/GlobalStyle";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { getEssayList } from "@/components/redux/Essay/server/actions";

const WirteStyle = styled.div`
  ${ColBox}
  height: 100vh;
  width: 100%;
`;

const question = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEssayList());
  }, []);

  return (
    <WirteStyle>
      <QuestionComposer />
    </WirteStyle>
  );
};

export default question;
