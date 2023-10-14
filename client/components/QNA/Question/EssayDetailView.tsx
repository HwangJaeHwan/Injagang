import React, { useEffect } from "react";
import styled from "styled-components";
import { ScrollBar } from "@/styles/GlobalStyle";
import EssayDetailItems from "./EssayDetailItems";
import useCoverLetterManager from "@/components/CoverLetter/hooks/useCoverLetterManager";

interface EssayProps {
  essayId: number;
}

const EssayDetailView = ({ essayId = 0 }: EssayProps) => {
  const { readEssayList, getDetailEssayList } = useCoverLetterManager();
  useEffect(() => {
    if (essayId > 0) {
      getDetailEssayList(essayId);
    }
  }, [essayId]);

  return (
    <EssayDetailStyle>
      {readEssayList?.map(essayList => (
        <EssayContainer key={essayList.essayId}>
          <h2 className="essay_title">{essayList.title}</h2>
          <>
            {essayList.qnaList.map(qna => (
              <EssayDetailItems key={qna.qnaId} {...qna} />
            ))}
          </>
        </EssayContainer>
      ))}
    </EssayDetailStyle>
  );
};

export default React.memo(EssayDetailView);

const EssayDetailStyle = styled.div`
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
const EssayContainer = styled.div`
  .essay_title {
    text-align: center;
    color: #fff;
  }
`;
