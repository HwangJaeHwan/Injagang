import React from "react";
import styled from "styled-components";
import { ColBox } from "@/styles/GlobalStyle";
import AnswerWirte from "@/components/QNA/Answer/AnswerWirte";

const ViewStyle = styled.div`
  ${ColBox}
  width: 80vw;
`;

const answer = () => {
  return (
    <ViewStyle>
      <AnswerWirte />
    </ViewStyle>
  );
};

export default answer;
