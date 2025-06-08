import React from "react";

import { useSelector } from "react-redux";

import styled from "styled-components";

import { RootReducerType } from "../redux/store";


import BoardList from "./BoardList";
import BoardListHead from "./BoardListHead";



const HEAD_ITEM = ["번호", "제목", "닉네임"];
const ID_KEY = "id";
const ROUTE_TEMPLATE = "/qna/answer";

const BoardListLayout = () => {
  const { boardInfos } = useSelector(
    (state: RootReducerType) => state.board.boardInFoList,
  );
  return (
    <BoardListViewStyle>
      <BoardListHead headItem={HEAD_ITEM} />
      <BoardList
        boardInfos={boardInfos.reverse() ?? []}
        idKey={ID_KEY}
        displayKeys={["id", "title", "nickname"]}
        route={ROUTE_TEMPLATE}
      />
    </BoardListViewStyle>
  );
};

export default BoardListLayout;

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
