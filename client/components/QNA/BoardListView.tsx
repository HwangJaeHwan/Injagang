import React from "react";
import { InitiaState } from "@/components/redux/QnA/reducer";
import { RootReducerType } from "@/components/redux/store";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import styled from "styled-components";
import BoardListItme from "./BoardListItme";

const BoardListViewStyle = styled.table`
  border: 1px solid #af5454;
  margin: 30px auto;
  width: 80%;
  height: 60vh;
  thead th {
    font-weight: bold;
    font-size: 18px;
    border: 1px solid #835757;
  }
  thead th:first-child {
    border: 1px solid #835757;
    width: 10%;
  }
`;

const BoardListView = () => {
  const boardReducer: InitiaState = useSelector(
    (state: RootReducerType) => state.board,
  );
  const router = useRouter();
  return (
    <BoardListViewStyle>
      <thead>
        <tr>
          <th>번호</th>
          <th>제목</th>
          <th>닉네임</th>
        </tr>
      </thead>
      {boardReducer.boardInFoList &&
        boardReducer.boardInFoList.map((list, i) =>
          list.boardInfos.map((list, idx) => (
            <BoardListItme key={list.id} {...list}></BoardListItme>
          )),
        )}
    </BoardListViewStyle>
  );
};

export default BoardListView;
