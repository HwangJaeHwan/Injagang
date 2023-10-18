import React from "react";
import AnswerDragView from './AnswerDragView'
import BoardItem from './BoardItem'
import EditMenuBar from "./EditMenuBar";
import { Card, ColBox, ScrollBar } from "@/styles/GlobalStyle";
import { useSelector } from "react-redux";
import { RootReducerType } from "@/components/redux/store";
import styled from "styled-components";

const AnswerDetailView = () => {
  const { boardList, isUpdated } = useSelector(
    (state: RootReducerType) => state.board,
  );
  if (isUpdated) return <p>유저의 질문을 받아오는중입니다.</p>;
  return (
    <Card size={{ width: "80%", height: "45vh", flex: "row" }}>
      <SwitchContainer>
        <LeftContainer>
          <BoardItem {...boardList} />
        </LeftContainer>
        <RigthContainer>
          <AnswerDragView />
        </RigthContainer>
      </SwitchContainer>
      {boardList.owner && <EditMenuBar boardID={boardList.boardId} />}
    </Card>
  );
};

export default AnswerDetailView;
const LeftContainer = styled.div`
  ${ColBox}
  ${ScrollBar}
  overflow-x: hidden;
  width: 50%;
  height: 100%;
  word-break: break-all;
  @media screen and (max-width: 1200px) {
    width: 100%;
    height: 45%;
  }
`;

const RigthContainer = styled.div`
  ${ColBox}
  height: 100%;
  width: 50%;
  @media screen and (max-width: 1200px) {
    width: 100%;
    height: 45%;
  }
`;

const SwitchContainer = styled.div`
  display: flex;
  width: 100%;
  height: 95%;
  gap: 30px;
  padding: 8px;

  @media screen and (max-width: 1200px) {
    flex-direction: column;
  }
`;
