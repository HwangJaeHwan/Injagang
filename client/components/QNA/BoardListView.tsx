import React from "react";
import { InitiaState } from "@/components/redux/QnA/reducer";
import { RootReducerType } from "@/components/redux/store";
import { useSelector } from "react-redux";
import styled from "styled-components";
import BoardListItme from "./BoardListItme";

const BoardListViewStyle = styled.table`
  border: 1px solid #0a0a0a;
  margin: 30px auto;
  width: 80%;
  thead th {
    font-weight: bold;
    font-size: 18px;
    border: none;
    background-color: #ffa600e4;
  }
  thead th:first-child {
    width: 10%;
  }
`;

const BoardListView = () => {
  const boardReducer = useSelector(
    (state: RootReducerType) => state.board.boardInFoList
  );
  return (
    <BoardListViewStyle>
      <thead>
        <tr>
          <th>번호</th>
          <th>제목</th>
          <th>닉네임</th>
        </tr>
      </thead>
      {boardReducer &&
        boardReducer.map((list, i) =>
          list.boardInfos.map((list, idx) => (
            <BoardListItme key={list.id} {...list}></BoardListItme>
          )),
        )}
    </BoardListViewStyle>
  );
};

export default BoardListView;
