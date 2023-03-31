import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getEssayList, readEssayList } from "./redux/Essay/actions";
import { RootReducerType } from "./redux/store";
import styled from "styled-components";
import { ScrollBar } from "@/styles/GlobalStyle";

const EssayDetailStyle = styled.div`
  ${ScrollBar}
  padding: 15px;
  background-color: #858080e8;
  height: 100vh;
  width: 100%;
  word-break: break-all;
  overflow-x: hidden;
`;
const EssayContainer = styled.div``;
const EssayContent = styled.div`
  margin: 15px;
  aside{
    margin: 15px;
  }
`;

interface EssayProps {
  essayId: number;
}

const EssayDetailView = ({ essayId = 0 }: EssayProps) => {
  const dispatch = useDispatch();
  const essayReducer = useSelector((state: RootReducerType) => state.essay);
  useEffect(() => {
    if (essayId > 0){
      dispatch(readEssayList(essayId));
    }
  }, [essayId]);
  return (
    <EssayDetailStyle>
      {essayReducer.readEssayList &&
        essayReducer.readEssayList.map((essayList, i) => (
          <EssayContainer key={i}>
            <h2>{essayList.title}</h2>
            <EssayContent>
              {essayList.qnaList.map((a, i) => (
                <aside key={i}>
                  <h3>질문: {a.question}</h3>
                  <h5>답변: {a.answer} sadffdsafasfasdfasdfasdfasdfasdfasdfadsfsadffdsafasfasdfasdfasdfasdfasdfasdfadsfsadffdsafasfasdfasdfasdfasdfasdfasdfadsfsadffdsafasfasdfasdfasdfasdfasdfasdfadsfsadffdsafasfasdfasdfasdfasdfasdfasdfadsfsadffdsafasfasdfasdfasdfasdfasdfasdfadsfsadffdsafasfasdfasdfasdfasdfasdfasdfadsfsadffdsafasfasdfasdfasdfasdfasdfasdfadsfsadffdsafasfasdfasdfasdfasdfasdfasdfadsfsadffdsafasfasdfasdfasdfasdfasdfasdfadsfsadffdsafasfasdfasdfasdfasdfasdfasdfadsfsadffdsafasfasdfasdfasdfasdfasdfasdfadsfsadffdsafasfasdfasdfasdfasdfasdfasdfadsfsadffdsafasfasdfasdfasdfasdfasdfasdfadsfsadffdsafasfasdfasdfasdfasdfasdfasdfadsfsadffdsafasfasdfasdfasdfasdfasdfasdfadsfsadffdsafasfasdfasdfasdfasdfasdfasdfadsfsadffdsafasfasdfasdfasdfasdfasdfasdfadsfsadffdsafasfasdfasdfasdfasdfasdfasdfadsfsadffdsafasfasdfasdfasdfasdfasdfasdfadsfsadffdsafasfasdfasdfasdfasdfasdfasdfadsfsadffdsafasfasdfasdfasdfasdfasdfasdfadsfsadffdsafasfasdfasdfasdfasdfasdfasdfadsfsadffdsafasfasdfasdfasdfasdfasdfasdfadsfsadffdsafasfasdfasdfasdfasdfasdfasdfadsfsadffdsafasfasdfasdfasdfasdfasdfasdfadsfsadffdsafasfasdfasdfasdfasdfasdfasdfadsfsadffdsafasfasdfasdfasdfasdfasdfasdfadsfsadffdsafasfasdfasdfasdfasdfasdfasdfadsfsadffdsafasfasdfasdfasdfasdfasdfasdfadsfsadffdsafasfasdfasdfasdfasdfasdfasdfadsfsadffdsafasfasdfasdfasdfasdfasdfasdfadsf</h5>
                </aside>
              ))}
            </EssayContent>
          </EssayContainer>
        ))}
    </EssayDetailStyle>
  );
};

export default React.memo(EssayDetailView);
