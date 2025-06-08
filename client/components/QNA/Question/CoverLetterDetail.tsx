import React, { useEffect } from "react";

import styled from "styled-components";

import { ScrollBar } from "@/styles/GlobalStyle";
import CoverLetterItem from "./CoverLetterItem";

import useCoverLetterManager from "@/components/CoverLetter/hooks/useCoverLetterManager";

interface CoverLetterProps {
  essayId: number;
}

const CoverLetterDetail = ({ essayId = 0 }: CoverLetterProps) => {
  const { readEssayList, getDetailEssayList } = useCoverLetterManager();
  useEffect(() => {
    if (essayId > 0) {
      getDetailEssayList(essayId);
    }
  }, [essayId]);

  return (
    <CoverLetterDetailStyle>
      {readEssayList?.map(essayList => (
        <CoverLetterContainer key={essayList.essayId}>
          <h2 className="essay_title">{essayList.title}</h2>
          <>
            {essayList.qnaList.map(qna => (
              <CoverLetterItem  key={qna.qnaId} {...qna} />
            ))}
          </>
        </CoverLetterContainer>
      ))}
    </CoverLetterDetailStyle>
  );
};

export default React.memo(CoverLetterDetail);

const CoverLetterDetailStyle = styled.div`
  ${ScrollBar}
  padding: 15px;
  background-color: #191919;
  border-radius: 10.5px;
  color: #dad6d1;
  height: 100vh;
  width: 100%;
  word-break: break-all;
  overflow-x: hidden;
`;
const CoverLetterContainer = styled.div`
  .essay_title {
    text-align: center;
    color: #fff;
  }
`;
