import { ScrollBar } from "@/styles/GlobalStyle";
import React from "react";
import styled from "styled-components";
ScrollBar;

interface CorrectionViewProps {
  targetQuestion: number;
  targetAnswer: string;
}
const CorrectionView = ({
  targetQuestion,
  targetAnswer,
}: CorrectionViewProps) => {
  return (
    <CorrectionContainer>
      <span className="correction_title">
        현재 선택된 문장: {targetQuestion !== 0 ?? ""}
      </span>
      <h4 className="correction_sentence">{targetAnswer}</h4>
    </CorrectionContainer>
  );
};

export default CorrectionView;

const CorrectionContainer = styled.div`
  display: inline-block;
  ${ScrollBar}
  width: 98%;
  height: 30%;
  color: red;
  overflow-x: hidden;

  .correction_title {
    font-weight: bold;
  }

  .correction_sentence {
    font-weight: normal;
    margin-top: 8px;
    color: white;
    word-break: break-all;
    line-height: 1.6;
  }
`;
