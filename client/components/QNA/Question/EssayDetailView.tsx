import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { readEssayList } from "../../redux/Essay/server/actions";
import { RootReducerType } from "../../redux/store";
import styled from "styled-components";
import { ScrollBar } from "@/styles/GlobalStyle";
import EssayDetailItems from "./EssayDetailItems";

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

interface EssayProps {
  essayId: number;
}

const EssayDetailView = ({ essayId = 0 }: EssayProps) => {
  const dispatch = useDispatch();
  const readEssayReducer = useSelector(
    (state: RootReducerType) => state.essay.readEssayList,
  );
  useEffect(() => {
    if (essayId > 0) {
      dispatch(readEssayList(essayId));
    }
  }, [essayId]);
  return (
    <EssayDetailStyle>
      {readEssayReducer &&
        readEssayReducer.map(essayList => (
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
