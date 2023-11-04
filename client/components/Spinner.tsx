import { ColBox } from "@/styles/GlobalStyle";
import React from "react";
import styled, { keyframes } from "styled-components";

const Spinner = ({
  message = "데이터를 불러오는중입니다.",
}: {
  message?: string;
}) => {
  return (
    <SpinnerWrapper>
      <p>{message}</p>
      <SpinnerImg />
    </SpinnerWrapper>
  );
};

export default Spinner;
const SpinnerWrapper = styled.div`
  ${ColBox};
  gap: 12px;
`;

const spin = keyframes`
0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }   
`;

const SpinnerImg = styled.div`
  border: 6px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 6px solid #506274;
  width: 50px;
  height: 50px;
  animation: ${spin} 2s linear infinite;
`;
