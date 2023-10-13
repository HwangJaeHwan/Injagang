import React from "react";
import { RootReducerType } from "@/components/redux/store";
import { useSelector } from "react-redux";
import BoardListItme from "./BoardListItem";

const BoardList = () => {
  const { boardInfos } = useSelector(
    (state: RootReducerType) => state.board.boardInFoList,
  );
  return (
    <>
      {boardInfos.map((list, i) => (
        <BoardListItme key={list.id} {...list}></BoardListItme>
      ))}
    </>
  );
};

export default BoardList;
