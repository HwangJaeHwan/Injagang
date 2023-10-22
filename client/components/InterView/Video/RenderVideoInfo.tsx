import React from "react";
import styled from "styled-components";

interface RenderVideoInfoProps {
  numQuestions: number;
  curIndex: number;
}

const RenderVideoInfo = ({ numQuestions, curIndex }: RenderVideoInfoProps) => {
  return (
    <InfoUserList>
      <h2>{numQuestions}개의 질문이 대기중입니다.</h2>
      <br />
      <h2>
        {curIndex}/{numQuestions} 진행중
      </h2>
    </InfoUserList>
  );
};

export default RenderVideoInfo;

const InfoUserList = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  color: #555;
  h2 {
    margin-bottom: 8px;
  }
`;
