import React from "react";

import styled from "styled-components";

import { ColBox, FlexBox } from "@/styles/GlobalStyle";

interface RenderVideoInfoProps {
  numQuestions: number;
  curIndex: number;
  videoIdx: number;
}

const RenderVideoInfo = ({
  numQuestions,
  curIndex,
}: RenderVideoInfoProps) => {
  return (
    <InfoUserList>
      <h2>{numQuestions-curIndex}개의 질문이 대기중입니다.</h2>
      <br />
      <h2>
        {curIndex}/{numQuestions} 진행중
      </h2>
    </InfoUserList>
  );
};

export default RenderVideoInfo;

const InfoUserList = styled.div`
  width: 100%;
  ${ColBox}
  text-align: center;
  color: #ffffff;
  h2 {
    margin-bottom: 8px;
  }
`;
